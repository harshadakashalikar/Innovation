(function () {
  'use strict';
  angular.module('com.vyom.vyomlib.view-components.landing-console')
    .directive('comVyomVyomlibLandingConsole',

      function (rxRecordInstanceDataPageResource, rxRecordInstanceResource, $document, $window, $timeout, rxCurrentUser, rxNotificationMessage, rxViewComponentEventManager, rxGUID, $sce, rxRecordInstanceAttachmentResource, rxString) {
        return {
          restrict: 'E',
          templateUrl: 'scripts/view-components/landing-console/com-vyom-vyomlib-landing-console.directive.html',

          scope: {
            rxConfiguration: '='
          },

          link: function ($scope, $element, $window) {
            var _config;

            var init = function () {
              _config = $scope.rxConfiguration.propertiesByName;
              $scope.eventManager = rxViewComponentEventManager.getInstance($scope);
              $scope.Guid;
              //Card fields
              $scope.cardList = [];
              $scope.RecordDefinition = _config.recordDefinitionFullName;
              $scope.ApplicationName = _config.ApplicationName;
              $scope.Description = _config.Description;
              $scope.Color = _config.Color;
              $scope.tooltipHeader = _config.tooltipHeader;
              $scope.Icon = _config.Icon;
              $scope.tooltipDescription = _config.tooltipDescription;
              $scope.starsobj = [];

              $scope.FilterExp = _config.FilterExp;
              $scope.Views = _config.Views;
              $scope.recordFlag = 'false';
              $scope.cardActionGuid = _config.cardActionGuid;
              $scope.cardSorting = _config.cardSorting;
              $scope.cardOrder = _config.cardOrder;
              $scope.cardStatus = _config.cardStatus;
              $scope.cardFavourite = _config.cardFavourite;
              $scope.cardScope = _config.cardScope;
              $scope.mydata = [];
              $scope.rateMeActionGuid = _config.rateMeActionGuid;
              $scope.ratingCount = _config.ratingCount;

              //search
              $scope.SearchColor = _config.SearchColor;
              $scope.titleColor = _config.titleColor;
              $scope.Greetings = _config.Greetings;

              //Images fields
              $scope.BannerImage = _config.BannerImage;
              $scope.BannerURL = _config.BannerURL;
              //Category
              $scope.Category1 = _config.Category1;
              $scope.Category2 = _config.Category2;
              $scope.Category3 = _config.Category3;
              $scope.Category4 = _config.Category4;
              $scope.Category5 = _config.Category5;
              $scope.Category6 = _config.Category6;
              $scope.Category7 = _config.Category7;
              $scope.Category8 = _config.Category8;
              $scope.CategoryColor = _config.CategoryColor;

              //User
              $scope.CurrentUserFullName = rxCurrentUser.get().fullName;
              $scope.CurrentUserLoginName = rxCurrentUser.get().loginName;
              $scope.RecDef = "com.bmc.arsys.rx.foundation:Person";

              $scope.getCardList();
              $scope.show_hide_recordGrid();
            };
            $scope.setUrlTOModal = function (indexurl) {
              $scope.SetModalURL = indexurl;
            }

            $scope.trustSrc = function (url) {

              return $sce.trustAsResourceUrl(url);
            };

            $scope.redirecturl = function (redurl) {
              if (redurl) {
                $window.open(redurl, '_blank');
              }
            };

            $scope.getCardList = function () {
              var foo = rxRecordInstanceDataPageResource.withName($scope.RecordDefinition);
              var queryParams = {
                propertySelection: "1,2,3,4,5,6,7,8,179," + $scope.ApplicationName + "," + $scope.Description + "," + $scope.Color + "," + $scope.tooltipHeader + "," + $scope.Icon + "," + $scope.tooltipDescription + "," + $scope.BannerURL + "," + $scope.BannerImage + "," + $scope.Views + "," + $scope.ratingCount + "," + $scope.cardStatus + "," + $scope.cardFavourite + "," + $scope.cardScope,
                queryExpression: $scope.FilterExp ? $scope.FilterExp : ""
              };

              foo.get(100, 0, queryParams).then(
                function (allRecords) {
                  $scope.mydata = allRecords.data;
                  if ($scope.cardOrder == "true") {

                    $scope.cardList = $scope.mydata.sort(function (a, b) {
                      return b[$scope.cardSorting] - a[$scope.cardSorting];
                    });
                  } else {
                    $scope.cardList = _.sortBy(allRecords.data, $scope.cardSorting);
                  }
                  //.slice()

                  $scope.firstSlideImageObject = _.max($scope.cardList, function (obj) {
                    return obj[$scope.Views];
                  });
                  $scope.getImage(false, $scope.firstSlideImageObject[179], "first");

                  $scope.secondSlideImageObject = _.max($scope.cardList, function (obj) {
                    return $scope.firstSlideImageObject[$scope.Views] > obj[$scope.Views];
                  });
                  $scope.getImage(false, $scope.secondSlideImageObject[179], "second");

                  $scope.thirdSlideImageObject = _.max($scope.cardList, function (obj) {
                    return $scope.secondSlideImageObject[$scope.Views] > obj[$scope.Views];
                  });
                  $scope.getImage(false, $scope.thirdSlideImageObject[179], "third");
                }
              );
            }

            $scope.updateViewsCounter = function (RecInstanceId, views) {
              if ($scope.RecordDefinition) {
                var objectRecord = rxRecordInstanceResource.withName($scope.RecordDefinition);
                objectRecord.get(RecInstanceId).then(
                  function (record) {
                    record.setValue($scope.Views, views + 1);
                    record.put();

                    $scope.getCardList();
                  }
                );
              }
            };

            $scope.numFormatter = function (num) {
              if (num > 999 && num < 1000000) {
                return (num / 1000).toFixed(0) + 'K';
              } else if (num > 1000000) {
                return (num / 1000000).toFixed(0) + 'M';
              } else if (num < 1000) {
                return num;
              }
            }

            $scope.getImage = function (save_picture, recordId, imageNumber) {
              var attachmentsResource = rxRecordInstanceAttachmentResource.withName($scope.RecordDefinition);

              attachmentsResource.get(recordId, ($scope.BannerImage).toString()).then(function (fileStream) {
                if (fileStream) {

                  var arrayBufferView = new Uint8Array(fileStream.data); //  eslint-disable-line  no-undef

                  var file = new Blob([arrayBufferView], {
                    type: fileStream.headers('content-type')
                  });

                  var urlCreator = window.URL || window.webkitURL;
                  if (imageNumber == "first") {
                    $scope.firstSlideImage = urlCreator.createObjectURL(file);
                  } else if (imageNumber == "second") {
                    $scope.secondSlideImage = urlCreator.createObjectURL(file);
                  } else if (imageNumber == "third") {
                    $scope.thirdSlideImage = urlCreator.createObjectURL(file);
                  }
                  debugger;

                  if (save_picture) {
                    $scope.fileName = fileStream.headers('Content-Disposition').split('filename=')[1];
                    saveAs(file, $scope.fileName); //  eslint-disable-line  no-undef
                  }
                }
              });
            }

            $scope.clearSearchContainer = function () {
              $scope.query = "";
            }

            $scope.filterCards = function (filterinput) {
              $scope.query = filterinput;
            }

            $scope.setSelectedCardInstanceId = function (recInstanceID) {
              // trigger the change property event
              $scope.eventManager.propertyChanged({
                property: 'CardInstanceId', // name of the property that changed
                newValue: recInstanceID
              });
            }

            $scope.executeAction = function (guid) {

              $timeout(function () {
                var button;

                var buttonGuid = rxString.format('rx-action-button[rx-view-component-id=\'%s\'] > button', guid);

                button = $document.find(buttonGuid);

                if (button) {
                  button.click();
                } else {
                  rxNotificationMessage.error('Cannot find button ' + $scope.buttonGuid);
                }
              });
            }

            $scope.generateRating = function (starCount, guid) {
              $scope.stars = [];

              $scope.starSelectedColor = "color:orange";
              $scope.starNotSelectedColor = "";

              for (var i = 1; i <= 5; i++) {
                $scope.stars[i] = {
                  icon: i <= starCount ? 'd-icon-star ' : 'd-icon-star_o ',
                  style: i <= starCount ? $scope.starSelectedColor : $scope.starNotSelectedColor
                };
              }
              $scope.starsobj[guid] = $scope.stars;
            }

            $scope.updateCardFavourite = function (RecInstanceId, isFavourite) {

              var favouriteValue = isFavourite == 'true' ? 'false' : 'true';

              if ($scope.RecordDefinition) {
                var objectRecord = rxRecordInstanceResource.withName($scope.RecordDefinition);
                objectRecord.get(RecInstanceId).then(
                  function (record) {

                    record.setValue($scope.cardFavourite, favouriteValue);
                    record.put();
                    rxNotificationMessage.success("Saved Successfully!!");
                    $scope.getCardList();
                  }
                );
              }
            };

            $scope.getCardFavouriteClass = function (isFavouriteCard) {
              if (isFavouriteCard == 'true') {
                return "d-icon-heart w3-text-red";
              } else {

                return "d-icon-heart_o";
              }
            }

            $scope.sortByViews = function () {
              console.log("Selected value:" + $scope.selectedValue);

              if ($scope.selectedValue == "clear") {
                $(function () {
                  $(".selector").show();
                  $scope.getCardList();
                });
              }
              if ($scope.selectedValue == "fav") {
                $(function () {
                  $(".selector").filter(function () {
                    return $('span', this).hasClass('d-icon-heart_o');
                  }).hide();
                });
              }
              else if ($scope.selectedValue == "status") {
                $(function () {
                  $(".selector").filter(function () {
                    return $('span', this).hasClass('cardOffline');
                  }).hide();
                });
              }
              else {
                $scope.cardList = $scope.mydata.sort(function (a, b) {
                  console.log(a.CardAvailibilty);
                  return b[$scope.selectedValue] - a[$scope.selectedValue];
                });
              }
            }

            //List-card
            $scope.show_hide_recordGrid = function () {
              $scope.recordFlag = ($scope.recordFlag == 'false') ? 'true' : 'false';

              console.log($scope.recordFlag);
              $scope.eventManager.propertyChanged({
                property: 'recordFlag',
                newValue: $scope.recordFlag
              });
            };

            init();
          }

        };
      });
})();
