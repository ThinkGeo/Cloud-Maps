﻿using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Documents;
using ThinkGeo.MapSuite;
using ThinkGeo.MapSuite.Layers;
using ThinkGeo.MapSuite.Shapes;
using ThinkGeo.MapSuite.Wpf;

namespace ThinkGeoCloudVectorMapsOverlayOnlineSample_wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const string clientId = "FSDgWMuqGhZCmZnbnxh-Yl1HOaDQcQ6mMaZZ1VkQNYw~";
        private const string clientSecret = "IoOZkBJie0K9pz10jTRmrUclX6UYssZBeed401oAfbxb9ufF1WVUvg~~";

        private ThinkGeoCloudVectorMapsOverlay thinkGeoCloudVectorMapsOverlay;
        
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            wpfMap.MapUnit = GeographyUnit.Meter;
            wpfMap.ZoomLevelSet = new ThinkGeoCloudMapsZoomLevelSet();

            // Create background world map with vector tile requested from ThinkGeo Cloud Service. 
            thinkGeoCloudVectorMapsOverlay = new ThinkGeoCloudVectorMapsOverlay(clientId, clientSecret);
            wpfMap.Overlays.Add(thinkGeoCloudVectorMapsOverlay);

            wpfMap.CurrentExtent = new RectangleShape(-12922411.9716445, 8734539.23446158, -8568181.07911278, 687275.650686126);
        }

        private void radioButtonLight_Checked(object sender, RoutedEventArgs e)
        {
            if (thinkGeoCloudVectorMapsOverlay != null)
            {
                thinkGeoCloudVectorMapsOverlay.MapType = ThinkGeoCloudVectorMapsMapType.Light;
                wpfMap.Refresh();
            }
        }

        private void radioButtionDark_Checked(object sender, RoutedEventArgs e)
        {
            if (thinkGeoCloudVectorMapsOverlay != null)
            {
                thinkGeoCloudVectorMapsOverlay.MapType = ThinkGeoCloudVectorMapsMapType.Dark;
                wpfMap.Refresh();
            }
        }

        private void radioButtionTransparent_Checked(object sender, RoutedEventArgs e)
        {
            if (thinkGeoCloudVectorMapsOverlay != null)
            {
                thinkGeoCloudVectorMapsOverlay.MapType = ThinkGeoCloudVectorMapsMapType.TransparentBackground;
                wpfMap.Refresh();
            }
        }

        private void radioButtionCustom_Checked(object sender, RoutedEventArgs e)
        {

            // Relative Path.
            var uri0 = new Uri("mutedblue.json", UriKind.Relative);
            //// Web Address.
            //var uri1 = new Uri("http://cdn.thinkgeo.com/worldstreets-styles/1.0.0/mutedblue.json");
            //// Absolute Path
            //var uri2 = new Uri("C:/temp/mutedblue.json");

            thinkGeoCloudVectorMapsOverlay.StyleJsonUri = uri0;
            wpfMap.Refresh();
            radioButtionDark.IsChecked = false;
            radioButtonLight.IsChecked = false;
        }

        private void Hyperlink_Click(object sender, RoutedEventArgs e)
        {
            var hyperlink = e.OriginalSource as Hyperlink;
            Process.Start(hyperlink.NavigateUri.ToString());
        }
    }
}