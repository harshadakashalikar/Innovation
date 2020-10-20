(function () {
    'use strict';

    angular.module('com.vyom.vyomlib.view-components.landing-console').factory('comVyomVyomlibLandingConsoleDesign', function (comVyomVyomlibLandingConsoleModel, rxGUID, RX_DEFINITION_PICKER) {
        function getRxConfig(componentDefinition, componentDescriptor) {
            return {
                id: componentDefinition.guid || rxGUID.generate(),
                type: componentDefinition.type,
                rxData: getRxData(componentDefinition, componentDescriptor),
                rxInspector: getRxInspector()
            };
        }


        function getRxData(componentDefinition, componentDescriptor) {



            return {

                recordDefinitionFullName: componentDefinition.propertiesByName.recordDefinitionFullName,
                ApplicationName: componentDefinition.propertiesByName.ApplicationName,
                Description: componentDefinition.propertiesByName.Description,

                cardActionGuid: componentDefinition.propertiesByName.cardActionGuid,
                cardSorting: componentDefinition.propertiesByName.cardSorting,
                cardOrder: componentDefinition.propertiesByName.cardOrder,
                cardStatus: componentDefinition.propertiesByName.cardStatus,
                cardFavourite: componentDefinition.propertiesByName.cardFavourite,
                cardScope: componentDefinition.propertiesByName.cardScope,
                Greetings: componentDefinition.propertiesByName.Greetings,
                titleColor: componentDefinition.propertiesByName.titleColor,

                rateMeActionGuid: componentDefinition.propertiesByName.rateMeActionGuid,
                ratingCount: componentDefinition.propertiesByName.ratingCount,

                Icon: componentDefinition.propertiesByName.Icon,
                tooltipHeader: componentDefinition.propertiesByName.tooltipHeader,
                Color: componentDefinition.propertiesByName.Color,
                tooltipDescription: componentDefinition.propertiesByName.tooltipDescription,
                FilterExp: componentDefinition.propertiesByName.FilterExp,
                SearchColor: componentDefinition.propertiesByName.SearchColor,
                BannerImage: componentDefinition.propertiesByName.BannerImage,
                BannerURL: componentDefinition.propertiesByName.BannerURL,
                Views: componentDefinition.propertiesByName.Views,

                Category1: componentDefinition.propertiesByName.Category1,
                Category2: componentDefinition.propertiesByName.Category2,
                Category3: componentDefinition.propertiesByName.Category3,
                Category4: componentDefinition.propertiesByName.Category4,
                Category5: componentDefinition.propertiesByName.Category5,
                Category6: componentDefinition.propertiesByName.Category6,
                Category7: componentDefinition.propertiesByName.Category7,
                Category8: componentDefinition.propertiesByName.Category8,
                CategoryColor: componentDefinition.propertiesByName.CategoryColor


            };
        }


        function getRxInspector() {
            return {
                inputs: {
                    rxData: {
                        SearchColor: {
                            label: 'Search Icon Color',
                            type: 'com-vyom-vyomlib-inspector-landing-console-bgcolor',
                            group: 'CardHeader',
                            index: 1
                        },

                        Greetings: {
                            label: 'Greetings',
                            type: 'rx-inspector-expression-node-field',
                            group: 'CardHeader',
                            index: 2
                        },

                        titleColor: {
                            label: 'titleColor',
                            type: 'com-vyom-vyomlib-inspector-portal-preview-bgcolor',
                            group: 'CardHeader',
                            index: 3
                        },
                        recordDefinitionFullName: {
                            label: 'Record Definition Name',
                            type: 'rx-inspector-definition-picker',
                            definitionType: RX_DEFINITION_PICKER.definitionTypes.regularRecord.type,
                            group: 'Card',
                            index: 1
                        },
                        ApplicationName: {
                            label: 'Application Name',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Card',
                            index: 2
                        },
                        Description: {
                            label: 'Description',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Card',
                            index: 3
                        },

                        Icon: {
                            label: 'Icon',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Card',
                            index: 4
                        },

                        Color: {
                            label: 'Color Class',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Card',
                            index: 5
                        },
                        tooltipHeader: {
                            label: 'Tooltip Header',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Card',
                            index: 6
                        },
                        tooltipDescription: {
                            label: 'Tooltip Description',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Card',
                            index: 7
                        },
                        Views: {
                            label: 'Views',
                            type: 'com-vyom-vyomlib-inspector-landing-console-integer',
                            group: 'Card',
                            index: 8
                        },
                        ratingCount: {
                            label: 'Stars',
                            type: 'com-vyom-vyomlib-inspector-landing-console-integer',
                            group: 'Card',
                            index: 9
                        },
                        rateMeActionGuid: {
                            label: 'Rate Me (btn Guid)',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Card',
                            index: 10
                        },
                        cardStatus: {
                            label: 'Availability/Unavailability',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            tooltip: {
                                text: "Values should be either true or false",
                                placement: "left"
                            },
                            group: 'Card',
                            index: 11
                        },
                        cardFavourite: {
                            label: 'Favourite',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            tooltip: {
                                text: "Values should be either true or false",
                                placement: "left"
                            },
                            group: 'Card',
                            index: 12
                        },
                        cardScope: {
                            label: 'Card Scope',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            tooltip: {
                                text: "Values should be either true or false",
                                placement: "left"
                            },
                            group: 'Card',
                            index: 13
                        },
                        FilterExp: {
                            label: 'Filter',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Card',
                            index: 14
                        },


                        cardActionGuid: {
                            label: 'Action Button Guid',
                            type: 'rx-inspector-expression-node-field',
                            group: 'cardAction',
                            index: 1
                        },
                        cardSorting: {
                            label: 'Sort By',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'cardAction',
                            index: 2
                        },
                        cardOrder: {
                            label: 'Initial Sort',
                            type: 'rx-inspector-optional-select',
                            options: [{
                                value: false,
                                content: "Ascending"
                                }, {
                                value: true,
                                content: "Descending"
                                }],
                            group: 'cardAction',
                            index: 3
                        },
                        BannerImage: {
                            label: 'Image',
                            type: 'com-vyom-vyomlib-inspector-landing-console-attachment',
                            group: 'Banner',
                            index: 1
                        },
                        BannerURL: {
                            label: 'URL',
                            type: 'com-vyom-vyomlib-inspector-landing-console-fields',
                            group: 'Banner',
                            index: 2
                        },
                        Category1: {
                            label: 'Label1',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 1
                        },
                        Category2: {
                            label: 'Label2',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 2
                        },
                        Category3: {
                            label: 'Label3',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 3
                        },
                        Category4: {
                            label: 'Label4',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 4
                        },
                        Category5: {
                            label: 'Label5',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 5
                        },
                        Category6: {
                            label: 'Label6',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 6
                        },
                        Category7: {
                            label: 'Label7',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 7
                        },
                        Category8: {
                            label: 'Label8',
                            type: 'rx-inspector-expression-node-field',
                            group: 'Category',
                            index: 8
                        },

                        CategoryColor: {
                            label: 'Color',
                            type: 'com-vyom-vyomlib-inspector-landing-console-bgcolor',
                            group: 'Category',
                            index: 9
                        }

                    }
                },
                groups: {
                    General: {
                        label: 'General',
                        closed: true,
                        index: 1
                    },
                    Card: {
                        label: 'Card',
                        closed: true,
                        index: 2
                    },
                    cardAction: {
                        label: 'Card Action',
                        closed: true,
                        index: 3
                    },
                    Banner: {
                        label: 'Banner',
                        closed: true,
                        index: 4
                    },
                    CardHeader: {
                        label: 'Card Header',
                        closed: true,
                        index: 5
                    },
                    Category: {
                        label: 'Category',
                        closed: true,
                        index: 6
                    }

                },

            };
        }

        return {
            //  should return a model instance
            getModel: function (componentDefinition, componentDescriptor) {
                return new comVyomVyomlibLandingConsoleModel(getRxConfig(componentDefinition, componentDescriptor));
            }
        };
    });
})();
