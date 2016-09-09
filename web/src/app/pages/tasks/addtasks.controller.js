(function() {
    'use strict';

    angular.module('BlurAdmin.pages.addtasks').controller('AddTasksPageCtrl', AddTasksPageCtrl);

    function AddTasksPageCtrl($scope,$uibModal) {
        $scope.tasks = [{
            'title': 'Expert in node ##### and angular js'
        }, {
            'title': 'Angular'
        }, {
            'title': 'React'
        }, {
            'title': 'Bootstrap'
        }, {
            'title': 'Leadership'
        }];

        $scope.reset = function() {
            $scope.newtask = angular.copy($scope.master);
        };

        $scope.addtask = function() {
            $scope.submitted = true;
            if (($scope.add.newtask.$dirty || $scope.submitted) && $scope.add.newtask.$error.required) {
                console.log("do nothing");
            } else {
                $scope.tasks.push({
                    'title': $scope.newtask
                })
                $scope.submitted = false;
                $scope.reset();
                console.log($scope.tasks);

            }
        };

        $scope.deleteItem = function(task) {
            $uibModal.open({
                animation: true,
                controller: 'AddModalCtrl',
                templateUrl: 'app/pages/tasks/modal/addtaskmodal.html',
                resolve:{
                  task:function(){
                    return $scope.tasks.indexOf(task);
                  }
                }
            }).result.then(function(task) {
                $scope.tasks.splice(task, 1);
            });

        };


    }
})();
