
var OilModule = angular.module('OilModule',[]);
OilModule.factory('OilService',function($http){
  var oilService = {};
  var parse_header = {'X-Parse-Application-Id':'yclN1uRD6rgAyIVWAczo3yyLxajX5yckfxXlFm2g','X-Parse-REST-API-Key':'oIuwPK0922gs7XEAOrpPlhuL8SFbzz3h8MEMOXP8'};
  oilService.query = function(username,callback){
    //response from server
    where = {where:'{"user":"brightman"}',order:"-createdAt",limit:10};
    $http({method:'GET',url:'https://api.parse.com/1/classes/oil',
      headers:parse_header,
      params:where}).
      success(function(data,status,headers,config){
        oilService.records = data['results'];
        for(var i=1;i<oilService.records.length;i++){
          oilService.records[i].cph = oilService.records[i].amount * 100 /(oilService.records[i-1].mileage - oilService.records[i].mileage);
        }
        oilService.records[0].cph = '--';
        callback({success:true,msg:'获取数据成功!'});
      }).
      error(function(data,status,headers,config){
        callback({success:false,msg:'获取数据失败!'});
      });
  };
  oilService.add = function(item,callback){
    if(item.milesage < oilService.records[0].mileage){
      return callback({success:false,msg:'输入里程数比上次还小!'});
    }
    $http({method:'POST',url:'https://api.parse.com/1/classes/oil',
      headers:parse_header,
      data:item}).
      success(function(data,status,headers,config){
        oilService.records = [item].concat(oilService.records);
        oilService.records[1].cph = oilService.records[1].amount * 100 /(oilService.records[0].mileage-oilService.records[1].mileage);
        oilService.records[0].cph = '--';
        oilService.records[0].createdAt = data.createdAt;
        oilService.records[0].objectId = data.objectId;
        callback({success:true,msg:'记一笔成功!'});
      }).
      error(function(data,status,headers,config){
        callback({success:false,msg:'同步服务器失败!'});
      });

  }
  oilService.remove = function(callback){
    $http({method:'DELETE',url:'https://api.parse.com/1/classes/oil/' + oilService.records[0].objectId,
      headers:parse_header}).
      success(function(data,status,headers,config){
        oilService.records = oilService.records.slice(1);
        callback({success:true,msg:'本条纪录已删除!'});
      }).
      error(function(data,status,headers,config){
        callback({success:false,msg:'删除失败稍后再试!'});
      });
  }

  return oilService;
});



function OilCtrl($scope,OilService){
  OilService.query('brightman',function(ret){
      if(ret.success){
        $scope.records = OilService.records;
      }else{
        alert(ret.msg);
      }
  });
  $scope.addItem = function(){
    $scope.Item.user = 'brightman';
    OilService.add($scope.Item,function(ret){
      alert(ret.msg);
      if(ret.success){
        $scope.showlist = !$scope.showlist;
        $scope.records = OilService.records;
      }
    });
  };
  $scope.showlist = true; 
  $scope.toggleMenu = function(){
    $scope.showlist = !$scope.showlist; 
  };
  $scope.removeItem = function(){
    OilService.remove(function(ret){
      alert(ret.msg);
      if(ret.success){
        $scope.records = OilService.records;
      }
    });
  }
}

