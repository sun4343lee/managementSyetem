/**
 * 统一收银台 对账-支付宝账务汇总
 * 
 * @author  damon_chen
 * @version $Id$
 */

define(function(require,exports,module){
var app = require('app');
require('miDatepicker');
require('mselect');

app.register.controller('accountCtrl', ['$rootScope', '$scope', '$http', '$modal', '$state', '$stateParams', '$sce', 'dateFilter','FileUploader',
    function($rootScope, $scope, $http, $modal, $state, $stateParams, $sce, dateFilter,FileUploader) {

    	$scope.title = "登账/凭证录入";

    	$scope.singleP = {
    		"debitAccountNo": "",
    		"creditAccountNo": "",
    		"fee": "",
    		"comments": "",
    		"voucherFile": ""
    	}

        $scope.originone = "银行来源";
        $scope.origintwo = "银行来源";
        $scope.isExit = function(e){
            var accountNo = e.target.value;
            var name = e.target.name;
            $http.get("/accounting/account/query",{
                params: {"accountNo": accountNo}
            })
            .success(function(data){
               if(data.code === 0){
                    if(name == debitAccountNo){
                        $scope.originone = data.data.accountName;
                    }else{
                        $scope.origintwo = data.data.accountName;
                    }
               } 
            })
        }

    	$scope.singlesub = function(){
    		
    		var filedata = new FormData(document.querySelector('#singleform'));
    		if(filedata){
    			$scope.singleP.voucherFile = filedata;
    		};
    		// console.log(JSON.stringify($scope.singleP));
    		$http({
    			method: "POST",
	    		url: "accounting/voucher/import",
	    		data: $scope.singleP,
	            headers: { 'Content-Type': undefined},
	            transformRequest: angular.identity 
        	})
            .success(function(data){
            	if(data.code===0){

            		alert("录入成功！");
                    $state.go('accounting.account', {
                        reload: true
                    });
            	}else{
            		alert("录入失败！");
            	}
            })
    	}

    	$scope.reset = function(){

        	$scope.singleP = {};
    	}


    }])
}）