using System;
using System.Linq;
using System.Configuration;
using System.Windows;
using System.Windows.Controls;
using ThinkGeo.MapSuite;
using ThinkGeo.MapSuite.Layers;
using ThinkGeo.MapSuite.Wpf;

namespace ThinkGeoCloudMapsSample
{
    public partial class MainWindow : Window
    {
        private const string clientId = "FSDgWMuqGhZCmZnbnxh-Yl1HOaDQcQ6mMaZZ1VkQNYw~";
        private const string clientSecret = "IoOZkBJie0K9pz10jTRmrUclX6UYssZBeed401oAfbxb9ufF1WVUvg~~";

        ThinkGeoCloudRasterMapsOverlay thinkGeoCloudMapsOverlay;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Map_Loaded(object sender, RoutedEventArgs e)
        {
            map.MapUnit = GeographyUnit.Meter;
            map.ZoomLevelSet = new ThinkGeoCloudMapsZoomLevelSet();
            thinkGeoCloudMapsOverlay = new ThinkGeoCloudRasterMapsOverlay(clientId, clientSecret);

            thinkGeoCloudMapsOverlay.WrappingMode = WrappingMode.WrapDateline;
            // Tiles will be cached in the TEMP folder (%USERPROFILE%\AppData\Local\Temp\MapSuite\PersistentCaches) by default if the TileCache property is not set.
            //thinkGeoCloudMapsOverlay.TileCache = new XyzFileBitmapTileCache("ThinkGeoCloudMapsTileCache");
            map.Overlays.Add(thinkGeoCloudMapsOverlay);

            map.CurrentExtent = new ThinkGeo.MapSuite.Shapes.RectangleShape(-13086298.60, 7339062.72, -8111177.75, 2853137.62);
            map.Refresh();
        }


        private void ChangeMapType(object sender, RoutedEventArgs e)
        {
            if (IsLoaded)
            {
                RadioButton radioButton = sender as RadioButton;
                if (thinkGeoCloudMapsOverlay != null)
                {
                    thinkGeoCloudMapsOverlay.MapType = (ThinkGeoCloudRasterMapsMapType)Enum.Parse(typeof(ThinkGeoCloudRasterMapsMapType), radioButton.Content.ToString());
                    map.Refresh();
                }
            }
        }

    }
}
