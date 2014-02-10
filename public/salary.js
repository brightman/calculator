function SalaryCtrl($scope){
  $scope.cities = [
  {name:'北京', company:[0.2,0.1,0.01,0.003,0.008,0.12],person:[0.08,0.02,0.002,0,0,0.12],limit:[15669,15669]},
  {name:'上海',company:[0.22,0.12,0.02,0.005,0.005,0.07],person:[0.08,0.02,0.001,0,0,0.07],limit:[12993,13000]},
  {name:'广州',company:[0.20,0.08,0.02,0.005,0.0085,0.07],person:[0.08,0.02,0.01,0,0,0.07],limit:[12303,12303]},
  {name:'深圳',company:[0.14,0.065,0.02,0.008,0.005,0.13],person:[0.08,0.02,0.01,0,0,0.13],limit:[13785,22975]},
  {name:'天津',company:[0.2,0.1,0.02,0.005,0.008,0.11],person:[0.08,0.02,0.01,0,0,0.11],limit:[11331,14508]},
  {name:'其他',company:[0.2,0.1,0.01,0.005,0.005,0.08],person:[0.08,0.02,0.01,0,0,0.08],limit:[15000,15000]},
  ];

  $scope.rates = [{name:'养老',flag:true},{name:'医疗',flag:true},{name:'失业',flag:true},{name:'工伤',flag:true},{name:'生育',flag:true},{name:'公积金',flag:true}];
  
  $scope.sat = function(){
    $scope.taxCom=0;
    $scope.taxPerson=0;
    var shebao = ($scope.salary > $scope.city.limit[0])? $scope.city.limit[0]:$scope.salary;
    var gongjijin = ($scope.salary > $scope.city.limit[1])? $scope.city.limit[1]:$scope.salary;
    $scope.city.limit0 = shebao;
    $scope.city.limit1 = gongjijin;
    for(var i=0;i<5;i++){
      if($scope.rates[i].flag){
        $scope.taxCom += shebao * $scope.city.company[i];
        $scope.taxPerson += shebao * $scope.city.person[i];
      }
    }
    if($scope.rates[5].flag){
        $scope.taxCom += gongjijin * $scope.city.company[5];
        $scope.taxPerson += gongjijin * $scope.city.person[5];
    }
    var tax = 0;
    var sat = $scope.salary - $scope.taxPerson - 3500;

    if(sat>0 && sat<1500){
      tax = sat * 0.03;
    }
    if(sat>=1500 && sat<4500){
      tax = sat * 0.1-105;
    }
    if(sat>=4500 && sat<9000){
      tax = sat * 0.2-555;
    }
    if(sat>=9000 && sat<35000){
      tax = sat * 0.25-1005;
    }
    if(sat>=35000 && sat<55000){
      tax = sat * 0.30-2755;
    }
    if(sat>=55000 && sat<80000){
      tax = sat * 0.35-5505;
    }
    if(sat>=80000){
      tax = sat * 0.45-13505;
    }
    $scope.tax =tax;
    $scope.salaryaftertax = $scope.salary - $scope.taxPerson - tax;
    return $scope.salaryaftertax;
  }
}
