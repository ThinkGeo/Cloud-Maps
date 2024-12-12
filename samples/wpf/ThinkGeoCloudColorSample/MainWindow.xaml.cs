using System.Linq;
using System.Windows;
using System;
using System.Configuration;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ThinkGeo.Core;
using ThinkGeo.UI.Wpf;

namespace ThinkGeoCloudColor
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const string GisServerUri = "https://cloud.thinkgeo.com";
        private const string clientId = "AOf22-EmFgIEeK4qkdx5HhwbkBjiRCmIDbIYuP8jWbc~";
        private const string clientSecret = "xK0pbuywjaZx4sqauaga8DMlzZprz0qQSjLTow90EhBx5D8gFd2krw~~";
        private ColorCloudClient colorClient;
        private LayerOverlay layerOverlay;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            colorClient = new ColorCloudClient(clientId, clientSecret);
            colorClient.BaseUris.Add(new Uri(GisServerUri));

            map.MapUnit = GeographyUnit.Meter;
            map.ZoomLevelSet = new ThinkGeoCloudMapsZoomLevelSet();
            map.CurrentExtent = new RectangleShape(-18080720.3182402, 19323280.6431411, 21368124.0124659, -9206687.13174462);

            layerOverlay = new LayerOverlay();
            ShapeFileFeatureLayer shapeFileFeatureLayer = new ShapeFileFeatureLayer(@"../../AppData/cntry02.shp");
            layerOverlay.Layers.Add("Population", shapeFileFeatureLayer);
            map.Overlays.Add(layerOverlay);

            RefreshMap();
        }

        private static bool TryCovertToGeoColor(string colorExpression, out GeoColor color)
        {
            color = null;
            try
            {
                color = GeoColor.FromHtml(colorExpression);
            }
            catch { }
            if (color != null)
            {
                return true;
            }

            try
            {
                color = GeoColor.FromHtml(colorExpression);
            }
            catch { }
            if (color != null)
            {
                return true;
            }

            return false;

        }

        private void RefreshMap()
        {
            Dictionary<GeoColor, Collection<GeoColor>> colorDictionary = new Dictionary<GeoColor, Collection<GeoColor>>();

            int numberOfColors = 20;
            bool isSpecifiedColor = rdoSpecificColor.IsChecked.Value;
            TryCovertToGeoColor(txtSpecificColor.Text, out var specifiedColor);
            switch (cboColorType.SelectionBoxItem.ToString())
            {
                case "Hue":
                    var hueColors = isSpecifiedColor ? colorClient.GetColorsInHueFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInHueFamily(numberOfColors);
                    colorDictionary.Add(specifiedColor, hueColors);
                    break;
                case "Analogous":
                    colorDictionary = isSpecifiedColor ? colorClient.GetColorsInAnalogousFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInAnalogousFamily(numberOfColors);
                    break;
                case "Complementary":
                    colorDictionary = isSpecifiedColor ? colorClient.GetColorsInComplementaryFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInComplementaryFamily(numberOfColors);
                    break;
                case "Contrasting":
                    colorDictionary = isSpecifiedColor ? colorClient.GetColorsInContrastingFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInContrastingFamily(numberOfColors);
                    break;
                case "Quality":
                    var qualityColors = isSpecifiedColor ? colorClient.GetColorsInQualityFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInQualityFamily(numberOfColors);
                    colorDictionary.Add(specifiedColor, qualityColors);
                    break;
                case "Tetrad":
                    colorDictionary = isSpecifiedColor ? colorClient.GetColorsInTetradFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInTetradFamily(numberOfColors);
                    break;
                case "Triad":
                    colorDictionary = isSpecifiedColor ? colorClient.GetColorsInTriadFamily(specifiedColor, numberOfColors)
                        : colorClient.GetColorsInTriadFamily(numberOfColors);
                    break;
            }

            List<GeoColor> allColors = new List<GeoColor>();
            foreach (var colors in colorDictionary.Values)
                allColors.AddRange(colors);

            ShapeFileFeatureLayer layer = (ShapeFileFeatureLayer)(layerOverlay.Layers["Population"]);
            layer.ZoomLevelSet.ZoomLevel01.CustomStyles.Clear();

            ClassBreakStyle classBreakStyle = new ClassBreakStyle();
            classBreakStyle.ColumnName = "pop_cntry";
            double population = 50000;
            foreach (var color in allColors)
            {
                AreaStyle areaStyle = new AreaStyle(new GeoSolidBrush(color));
                population *= 2;
                classBreakStyle.ClassBreaks.Add(new ClassBreak(population, areaStyle));
            }
            layer.ZoomLevelSet.ZoomLevel01.CustomStyles.Add(classBreakStyle);
            layer.ZoomLevelSet.ZoomLevel01.ApplyUntilZoomLevel = ApplyUntilZoomLevel.Level20;

            map.Refresh(layerOverlay);
        }

        private void GenerateClick(object sender, RoutedEventArgs e)
        {
            RefreshMap();
        }
    }
}