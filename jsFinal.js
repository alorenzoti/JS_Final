
require([
        "esri/map",
       

        "esri/layers/FeatureLayer",
        "esri/tasks/query",

        "esri/tasks/ServiceAreaTask",
        "esri/tasks/ServiceAreaSolveResult",
        "esri/tasks/ServiceAreaParameters",

        "esri/graphic",
        "esri/tasks/FeatureSet",


        
                    

        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/_base/array",
        ],
    function (Map, 

            FeatureLayer,
            Query,

            ServiceAreaTask,
            ServiceAreaSolveResult,
            ServiceAreaParameters,

            Graphic,
            FeatureSet,

            


            ready, parser,on,array) {


        
        ready(function () {

            
            parser.parse();

           



           
            map = new Map("divMap", {
                basemap: "osm",
                center: [-3.6,40.4],
                zoom: 11
            });


            var centro_salud = new FeatureLayer("https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/CENTROS_SALUD_XYTableToPoint4/FeatureServer/0");

            map.addLayer(centro_salud)

           var query = new Query("https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/CENTROS_SALUD_XYTableToPoint4/FeatureServer/0") 

           query.where = "1=1";

           

           centro_salud.on("query-features-complete",show)

            function show(evt){
            console.log(evt)

            }



                       

            


            params = new ServiceAreaParameters();

            // params.facilities = facilities;
            params.outSpatialReference = map.spatialReference;
            params.returnFacilities = true;

            

            serviceAreaTask = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer")

            serviceAreaTask.solve(params,function(serviceAreaSolveResult){
                var result = serviceAreaSolveResult;
                array.forEach(serviceAreaSolveResult.serviceAreaPolygons,function(graphic){
                  map.graphics.add(graphic);
                });
              });

            






        });
    })