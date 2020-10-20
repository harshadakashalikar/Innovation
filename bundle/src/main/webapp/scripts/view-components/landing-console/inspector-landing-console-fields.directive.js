// This directive is used at design time to choose a field.
(function () {
    'use strict';

    angular.module('com.vyom.vyomlib.view-components.landing-console').directive('comVyomVyomlibInspectorLandingConsoleFields', function (RX_RECORD_DEFINITION, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/landing-console/com-vyom-vyomlib-inspector-landing-console-fields.directive.html',

            link: function ($scope) {

                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                init();


                function init() {


                    initializeFields();

                    // reinitialize fields when user change Record Definition
                    $scope.$watch('cell.recordDefinitionFullName', initializeFields);

                    $scope.$watch('data.selectedField', function (newValue) {
                        if (newValue) {
                            // set field id to the model
                            $scope.cell.prop($scope.path, $scope.data.selectedField.id);




                        }
                    }, true);

                }





                function initializeFields() {
                    if ($scope.cell.recordDefinitionFullName) {
                        $scope.data.fields = getFields();


                        $scope.data.selectedField = _.find($scope.data.fields, {
                            id: Number($scope.cell.prop($scope.path))
                        });
                    } else {
                        $scope.data.fields = [];
                        $scope.data.selectedField = null;
                    }
                }

                // get all attachment fields from the selected Record Definition
                function getFields() {
                    // console.log($scope.cell.recordDefinitionFullName.fieldDefinitions);

                    return _($scope.cell.recordDefinitionFullName.fieldDefinitions)
                        .map(function (fieldDefinition) {
                            return {
                                id: fieldDefinition.id,
                                name: fieldDefinition.name,

                            };
                        })
                        .value();
                }
            }

        };
    });
})();
