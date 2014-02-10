function SechouseCtrl($scope){
  $scope.tax = {};
  $scope.seller = {};
  $scope.buyer = {};
  $scope.sechousetax = function(){
    $scope.total = $scope.total * 10000;
    if($scope.area < 90 && $scope.buyfirst){
      $scope.tax.qishui = $scope.total * 0.01;
    }
    if($scope.area > 90 && $scope.area < 140){
      $scope.tax.qishui = $scope.total * 0.015;
    }
    if($scope.area > 140){
      $scope.tax.qishui = $scope.total * 0.03;
    }
    $scope.buyer.qishui = $scope.tax.qishui;
    if($scope.full5){
      $scope.tax.yinyeshui = $scope.total * 0;
    }else{
      $scope.tax.yinyeshui = $scope.total * 0.056;
    }
    $scope.seller.yinyeshui = $scope.tax.yinyeshui;
    if($scope.full5 && $scope.only1){
      $scope.tax.gerenshuode = $scope.total * 0;
    }else{
      $scope.tax.gerenshuode = $scope.total * 0.01;
    }
    $scope.seller.gerenshuode = $scope.tax.gerenshuode;

    $scope.tax.total = $scope.tax.qishui+$scope.tax.yinyeshui + $scope.tax.gerenshuode;
    $scope.seller.total = $scope.seller.yinyeshui + $scope.seller.gerenshuode;
    $scope.buyer.total = $scope.buyer.qishui;
    $scope.total = $scope.total / 10000;
  }
}
