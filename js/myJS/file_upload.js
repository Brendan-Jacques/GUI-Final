var file_upload = angular.module('fileUpload', []);
         
    file_upload.directive('fileModel', ['$parse', function ($parse) {
        return {
  	    	restrict: 'A',
            link: function(scope, element, attrs) {
            	var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                  
                element.bind('change', function(){
                    scope.$apply(function(){
            	        modelSetter(scope, element[0].files[0]);
                    });
                });
           	}
        };
    }]);
      
    file_upload.service('fileUpload', ['$https:', function ($https) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            
            $https.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            
            .success(function(){
            })
            
            .error(function(){
            });
        }
    }]);
      
    file_upload.controller('fileUpload', ['$scope', 'fileUpload', function($scope, fileUpload){
        $scope.uploadFile = function(){
            var file = $scope.myFile;
               
            console.log('file is ' );
            console.dir(file);
               
            var uploadUrl = "http://weblab.cs.uml.edu/~bjacques/final/php/upload.php";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };
    }]);