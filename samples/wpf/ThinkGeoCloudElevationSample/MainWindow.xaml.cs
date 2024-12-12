using LiveCharts;
using LiveCharts.Configurations;
using LiveCharts.Wpf;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using ThinkGeo.UI.Wpf;
using ThinkGeo.Core;

namespace ThinkGeoCloudElevation
{
    public partial class MainWindow : Window
    {
        private const string CloudServerUri = "https://cloud.thinkgeo.com";
        private const string clientId = "AOf22-EmFgIEeK4qkdx5HhwbkBjiRCmIDbIYuP8jWbc~";
        private const string clientSecret = "xK0pbuywjaZx4sqauaga8DMlzZprz0qQSjLTow90EhBx5D8gFd2krw~~";
        private ElevationCloudClient elevationClient;
        private ObservableCollection<double> ChartAxisLabels { get; } = new ObservableCollection<double>();

        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            elevationClient = new ElevationCloudClient(clientId, clientSecret);
            elevationClient.BaseUris.Add(new Uri(CloudServerUri));

            WpfMap1.MapUnit = GeographyUnit.Meter;
            WpfMap1.ZoomLevelSet = new ThinkGeoCloudMapsZoomLevelSet();
            WpfMap1.CurrentExtent = new RectangleShape(-13044244.0708884, 4333756.90567755, -13024981.9465871, 4315741.71599989);
            WpfMap1.TrackOverlay.TrackEnded += TrackOverlay_TrackEnded;
            WpfMap1.TrackOverlay.TrackMode = TrackMode.Line;
 
            ThinkGeoCloudRasterMapsOverlay thinkGeoCloudMapsOverlay = new ThinkGeoCloudRasterMapsOverlay(clientId, clientSecret) 
            { 
                MapType = ThinkGeoCloudRasterMapsMapType.Aerial 
            };
            thinkGeoCloudMapsOverlay.WrappingMode = WrappingMode.WrapDateline;
            WpfMap1.Overlays.Add(thinkGeoCloudMapsOverlay);

            // Add start and end point layer.
            InMemoryFeatureLayer pointFeatureLayer = new InMemoryFeatureLayer();
            pointFeatureLayer.ZoomLevelSet.ZoomLevel01.DefaultPointStyle = PointStyle.CreateSimpleCircleStyle(GeoColors.Black, 7, GeoColors.White);
            pointFeatureLayer.ZoomLevelSet.ZoomLevel01.ApplyUntilZoomLevel = ApplyUntilZoomLevel.Level20;

            LayerOverlay isoLineOverlay = new LayerOverlay();
            WpfMap1.Overlays.Add("isoLineOverlay", isoLineOverlay);
            isoLineOverlay.IsVisible = false;

            SimpleMarkerOverlay markerOverlay = new SimpleMarkerOverlay();
            var waypointMarker = new Marker()
            {
                ImageSource = new BitmapImage(new Uri("/Images/waypoint.png", UriKind.RelativeOrAbsolute)),
                YOffset = -16
            };
            markerOverlay.Markers.Add(waypointMarker);
            WpfMap1.Overlays.Add("selectedOverlay", markerOverlay);

            LayerOverlay elevationLayerOverlay = new LayerOverlay();
            elevationLayerOverlay.Layers.Add("pointFeatureLayer", pointFeatureLayer);

            InMemoryFeatureLayer markLineLayer = new InMemoryFeatureLayer();
            markLineLayer.ZoomLevelSet.ZoomLevel01.DefaultPointStyle = PointStyle.CreateSimpleCircleStyle(GeoColors.Black, 7, GeoColors.White);
            markLineLayer.ZoomLevelSet.ZoomLevel01.ApplyUntilZoomLevel = ApplyUntilZoomLevel.Level20;

            LayerOverlay lineOverlay = new LayerOverlay();
            lineOverlay.Layers.Add(new InMemoryFeatureLayer());
            LayerOverlay markLineOverlay = new LayerOverlay();
            markLineOverlay.Layers.Add("markLineLayer", markLineLayer);

            WpfMap1.Overlays.Add("lineOverlay", lineOverlay);
            WpfMap1.Overlays.Add("elevationLayerOverlay", elevationLayerOverlay);
            WpfMap1.Overlays.Add("popupOverlay", new PopupOverlay());
            WpfMap1.Overlays.Add("markLineOverlay", markLineOverlay);

            SimpleMarkerOverlay markOverlay = new SimpleMarkerOverlay();
            WpfMap1.Overlays.Add("markOverlay", markOverlay);

            var startMarker = new Marker()
            {
                YOffset = -24,
                ImageSource = new BitmapImage(new Uri("/Images/start.png", UriKind.RelativeOrAbsolute))
            };
            markOverlay.Markers.Add("startMarker", startMarker);
            var endMarker = new Marker()
            {
                ImageSource = new BitmapImage(new Uri("/Images/end.png", UriKind.RelativeOrAbsolute)),
                YOffset = -24
            };
            markOverlay.Markers.Add("endMarker", endMarker);

            // Configure the chart.
            var mapper = Mappers.Xy<ChartInformation>().X(value => value.Distance).Y(value => value.Elevation);
            Charting.For<ChartInformation>(mapper);

            Slider.Value = 15;
            SliderDistance.Value = 200;

            WpfMap1.Refresh();
        }

        private InMemoryFeatureLayer GetWellElevationPointLayer(Dictionary<PointShape, double> wellElevationPointData)
        {
            //Create an in memory layer to hold the well data from the text file
            InMemoryFeatureLayer inMemoryFeatureLayer = new InMemoryFeatureLayer();
            inMemoryFeatureLayer.FeatureSource.Open();
            //Make sure to specify the depth column
            inMemoryFeatureLayer.Columns.Add(new FeatureSourceColumn("Depth", "String", 10));

            //Loop through all the point data and add it to the in memory layer
            foreach (KeyValuePair<PointShape, double> wellDepth in wellElevationPointData)
            {
                Feature feature = new Feature(wellDepth.Key);
                feature.ColumnValues.Add("Depth", wellDepth.Value.ToString());
                inMemoryFeatureLayer.InternalFeatures.Add(feature);
            }
            //Now that all of the data is added we can build an in memory index to make the lookups fast
            inMemoryFeatureLayer.BuildIndex();

            //Create the well point style
            PointStyle pointStyle1 = PointStyle.CreateSimpleCircleStyle(GeoColors.White, 4, GeoColors.Black, 2);
            inMemoryFeatureLayer.ZoomLevelSet.ZoomLevel01.CustomStyles.Add(pointStyle1);

            //Create the text style with a halo
            TextStyle textStyle = TextStyle.CreateSimpleTextStyle("Depth", "Arial", 10, DrawingFontStyles.Regular, GeoColors.Black);
            textStyle.HaloPen = new GeoPen(GeoColors.White, 3);
            textStyle.TextPlacement = TextPlacement.Upper;
            textStyle.YOffsetInPixel = 5;

            //Apply these styles at all levels and add then to the custom styles for the layer
            inMemoryFeatureLayer.ZoomLevelSet.ZoomLevel01.ApplyUntilZoomLevel = ApplyUntilZoomLevel.Level20;
            inMemoryFeatureLayer.ZoomLevelSet.ZoomLevel01.CustomStyles.Add(textStyle);

            return inMemoryFeatureLayer;
        }

        private DynamicIsoLineLayer GetDynamicIsoLineLayer(Dictionary<PointShape, double> wellElevationPointData)
        {
            Collection<double> isoLineLevels = GridIsoLineLayer.GetIsoLineLevels(wellElevationPointData, 25);

            //Create the new dynamicIsoLineLayer using the well data and the number of isoline levels from
            //the screen
            DynamicIsoLineLayer dynamicIsoLineLayer;

            dynamicIsoLineLayer = new DynamicIsoLineLayer(wellElevationPointData, isoLineLevels, new InverseDistanceWeightedGridInterpolationModel(2, double.MaxValue), IsoLineType.LinesOnly);

            dynamicIsoLineLayer.CellHeightInPixel = (int)(WpfMap1.ActualHeight / 80);
            dynamicIsoLineLayer.CellWidthInPixel = (int)(WpfMap1.ActualWidth / 80);

            //Create a series of colors from blue to red that we will use for the breaks
            Collection<GeoColor> colors = GeoColor.GetColorsInQualityFamily(GeoColors.Blue, GeoColors.Red, isoLineLevels.Count, ColorWheelDirection.Clockwise);

            //Setup a class break style based on the isoline levels and the colors
            ClassBreakStyle classBreakStyle = new ClassBreakStyle(dynamicIsoLineLayer.DataValueColumnName);

            Collection<ThinkGeo.Core.Style> firstStyles = new Collection<ThinkGeo.Core.Style>();
            firstStyles.Add(new LineStyle(new GeoPen(colors[0], 3)));
            firstStyles.Add(new AreaStyle(new GeoPen(GeoColors.LightBlue, 3), new GeoSolidBrush(new GeoColor(150, colors[0]))));
            classBreakStyle.ClassBreaks.Add(new ClassBreak(double.MinValue, firstStyles));
            for (int i = 0; i < colors.Count - 1; i++)
            {
                Collection<ThinkGeo.Core.Style> styles = new Collection<ThinkGeo.Core.Style>();
                styles.Add(new LineStyle(new GeoPen(colors[i + 1], 3)));
                styles.Add(new AreaStyle(new GeoPen(GeoColors.LightBlue, 3), new GeoSolidBrush(new GeoColor(150, colors[i + 1]))));
                classBreakStyle.ClassBreaks.Add(new ClassBreak(isoLineLevels[i], styles));
            }
            dynamicIsoLineLayer.CustomStyles.Add(classBreakStyle);

            //Create the text styles to label the lines
            TextStyle textStyle = TextStyle.CreateSimpleTextStyle(dynamicIsoLineLayer.DataValueColumnName, "Arial", 8, DrawingFontStyles.Bold, GeoColors.Black, 0, 0);
            textStyle.HaloPen = new GeoPen(GeoColors.White, 2);
            textStyle.OverlappingRule = LabelOverlappingRule.NoOverlapping;
            textStyle.SplineType = SplineType.StandardSplining;
            textStyle.DuplicateRule = LabelDuplicateRule.UnlimitedDuplicateLabels;
            textStyle.TextLineSegmentRatio = 9999999;
            textStyle.FittingLineInScreen = true;
            textStyle.SuppressPartialLabels = true;
            dynamicIsoLineLayer.CustomStyles.Add(textStyle);

            return dynamicIsoLineLayer;
        }

        private async void TrackOverlay_TrackEnded(object sender, TrackEndedTrackInteractiveOverlayEventArgs e)
        {
            var gradeLine = (LineShape)e.TrackShape;
            var length = gradeLine.GetLength(GeographyUnit.Meter, DistanceUnit.Meter);
            if (length > 12000)
            {
                MessageBox.Show("The selected distance is too long to get the elevation of this distance. Please re-enter.", "Warning");
                WpfMap1.TrackOverlay.TrackShapeLayer.Clear();
                return;
            }
            if (length < SliderDistance.Value)
            {
                SliderDistance.Value = (int)length;
            }
            var startVetie = gradeLine.Vertices[0];
            var vertie = gradeLine.Vertices.Last();
            var startMarker = ((SimpleMarkerOverlay)WpfMap1.Overlays["markOverlay"]).Markers["startMarker"];
            var endMarker = ((SimpleMarkerOverlay)WpfMap1.Overlays["markOverlay"]).Markers["endMarker"];
            startMarker.Position = new Point(startVetie.X, startVetie.Y);
            endMarker.Position = new Point(vertie.X, vertie.Y);
            WpfMap1.Overlays["markOverlay"].Refresh();
            WpfMap1.TrackOverlay.TrackShapeLayer.Clear();
            await ShowElevationForLineAsync(gradeLine);
        }

        private void ButtonClear_Click(object sender, RoutedEventArgs e)
        {
            ClearMap();
            ClearChart();
        }

        private void ClearMap()
        {
            ((LayerOverlay)WpfMap1.Overlays["lineOverlay"]).Layers.Clear();
            var pointlayer = (InMemoryFeatureLayer)((LayerOverlay)WpfMap1.Overlays["elevationLayerOverlay"]).Layers["pointFeatureLayer"];
            pointlayer.InternalFeatures.Clear();
            var markLineLayer = (InMemoryFeatureLayer)((LayerOverlay)WpfMap1.Overlays["markLineOverlay"]).Layers["markLineLayer"];
            markLineLayer.InternalFeatures.Clear();
            WpfMap1.Overlays["lineOverlay"].Refresh();
            WpfMap1.Overlays["markLineOverlay"].Refresh();
            WpfMap1.Overlays["elevationLayerOverlay"].Refresh();
            var popupOverlay = (PopupOverlay)WpfMap1.Overlays["popupOverlay"];
            popupOverlay.Popups.Clear();
            popupOverlay.Refresh();
            ((LayerOverlay)WpfMap1.Overlays["isoLineOverlay"]).Layers.Clear();
            ((LayerOverlay)WpfMap1.Overlays["isoLineOverlay"]).Refresh();
            // WpfMap1.TrackOverlay.TrackMode = TrackMode.None;
            var startMarker = ((SimpleMarkerOverlay)WpfMap1.Overlays["markOverlay"]).Markers["startMarker"];
            var endMarker = ((SimpleMarkerOverlay)WpfMap1.Overlays["markOverlay"]).Markers["endMarker"];
            startMarker.Position = new Point(0, 0);
            endMarker.Position = new Point(0, 0);
        }

        private void DrawElevationLineOnMap(IEnumerable<Feature> elevationFeatures)
        {
            InMemoryFeatureLayer elevationlayer = new InMemoryFeatureLayer();
            ((LayerOverlay)WpfMap1.Overlays["lineOverlay"]).Layers.Add(elevationlayer);
            var stroke = ((LineSeries)lineChart.Series.Last()).Stroke;
            var color = ((SolidColorBrush)stroke).Color;
            elevationlayer.ZoomLevelSet.ZoomLevel01.DefaultLineStyle = LineStyle.CreateSimpleLineStyle(GeoColor.FromArgb(color.A, color.R, color.G, color.B), 3, true);
            elevationlayer.ZoomLevelSet.ZoomLevel01.ApplyUntilZoomLevel = ApplyUntilZoomLevel.Level20;
            var pointlayer = (InMemoryFeatureLayer)((LayerOverlay)WpfMap1.Overlays["markLineOverlay"]).Layers["markLineLayer"];
            if (elevationFeatures.Any())
            {
                LineShape lineshape = new LineShape();
                foreach (Feature feature in elevationFeatures)
                {
                    lineshape.Vertices.Add(new Vertex(feature.GetShape() as PointShape));
                    pointlayer.InternalFeatures.Add(new Feature(feature.GetShape() as PointShape));
                }
                elevationlayer.InternalFeatures.Add(new Feature(lineshape));
            }
            WpfMap1.Overlays["markOverlay"].Refresh();
            WpfMap1.Overlays["elevationLayerOverlay"].Refresh();
            WpfMap1.Overlays["lineOverlay"].Refresh();
            WpfMap1.Overlays["markLineOverlay"].Refresh();
        }

        private void lvcChart_DataHover(object sender, ChartPoint chartPoint)
        {
            ChartInformation instance = (ChartInformation)chartPoint.Instance;
            SimpleMarkerOverlay markerOverlay = (SimpleMarkerOverlay)WpfMap1.Overlays["selectedOverlay"];
            markerOverlay.Markers[0].Position = new Point(instance.Longitude, instance.Latitude);
            markerOverlay.Refresh();
        }

        private void lvcChart_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e)
        {
            SimpleMarkerOverlay markerOverlay = (SimpleMarkerOverlay)WpfMap1.Overlays["selectedOverlay"];
            markerOverlay.Markers[0].Position = new Point(-179.0, -89.0);
            markerOverlay.Refresh();
        }

        private async Task ShowElevationForLineAsync(LineShape gradeLine)
        {
            try
            {
                BusyIndicator.Visibility = Visibility.Visible;
                var features = new List<Feature>();
                if (gradeLine.Vertices.Count > 1)
                {
                    var response = await GetElevationByLineAsync(gradeLine, (int)Slider.Value, (int)SliderDistance.Value);
                    var lineFeatures = response.ElevationPoints.Select(item =>
                        new Feature(item.Point)
                        {
                            ColumnValues = { { "elevation", item.Elevation.ToString() } }
                        });

                    features.AddRange(lineFeatures);
                }
                ShowElevationOnChart(features);
            }
            finally
            {
                BusyIndicator.Visibility = Visibility.Hidden;
            }
        }

        private async Task<CloudElevationResult> GetElevationByLineAsync(LineShape line, int pointNumber, int distance)
        {
            if (comboType.SelectedIndex == 0)
            {
                var response = await elevationClient.GetElevationOfLineAsync(line, 3857, numberOfSegments: pointNumber, elevationUnit: DistanceUnit.Meter);
                return response;
            }
            else if (comboType.SelectedIndex == 1)
            {
                var response = await elevationClient.GetElevationOfLineAsync(line, 3857, intervalDistance: distance, elevationUnit: DistanceUnit.Meter, intervalDistanceUnit: DistanceUnit.Meter);
                return response;
            }
            throw new NotSupportedException("Unknown Line model");
        }

        private void ClearChart()
        {
            ChartAxisLabels.Clear();
            lineChart.Series.Clear();
        }

        private void ShowElevationOnChart(IEnumerable<Feature> features)
        {
            var chartData = new Collection<ChartInformation>();
            double distance = 0.0;
            for (var index = 0; index < features.Count(); index++)
            {
                var feature = features.ElementAt(index);
                PointShape point = (PointShape)feature.GetShape();
                if (index != 0)
                {
                    PointShape lastPoint = (PointShape)features.ElementAt(index - 1).GetShape();
                    LineShape line = new LineShape(new Collection<Vertex> { new Vertex(lastPoint), new Vertex(point) });
                    distance += line.GetLength(3857, DistanceUnit.Meter, DistanceCalculationMode.Haversine);
                }
                double tmpDistance = Math.Round(distance / 1000.0, 2);
                double value = Math.Round(double.Parse(feature.ColumnValues["elevation"]), 2);
                ChartAxisLabels.Add(tmpDistance);
                chartData.Add(new ChartInformation(value, point.X, point.Y, tmpDistance));
            }
            var series = new LineSeries { Values = new ChartValues<ChartInformation>(chartData) };
            series.Loaded += (sender, e) => DrawElevationLineOnMap(features);
            lineChart.Series.Add(series);
        }
    }
}