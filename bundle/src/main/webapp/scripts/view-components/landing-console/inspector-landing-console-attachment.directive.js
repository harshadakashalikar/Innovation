(function () {
    'use strict';

    angular.module('com.vyom.vyomlib.view-components.landing-console').directive('comVyomVyomlibInspectorLandingConsoleAttachment', function (RX_RECORD_DEFINITION, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/landing-console/com-vyom-vyomlib-inspector-landing-console-attachment.directive.html',

            link: function ($scope) {

                $scope.data = {
                    fields: [],
                    selectedField: null
                };



                init();

                function init() {
                    initializeFields();

                    // Reinitialize field list when user changes Record Definition
                    $scope.$watch('cell.recordDefinitionFullName', initializeFields);

                    $scope.$watch('data.selectedField', function (newValue) {
                        if (newValue) {
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

                // Get all attachment fields from the selected Record Definition
                function getFields() {
                    return _($scope.cell.recordDefinitionFullName.fieldDefinitions)
                        .filter({
                            resourceType: RX_RECORD_DEFINITION.dataTypes.attachment.resourceType
                        })
                        .map(function (fieldDefinition) {
                            return {
                                id: fieldDefinition.id,
                                name: fieldDefinition.name
                            };
                        })
                        .value();
                }


            }

        };
    });
})();
