var app = angular.module("chatClient", [])

app.controller("ChatController", function($scope, $http, $interval){

	$scope.active = {
		compose: true,
		create: false,
	}

	$scope.messages = []
	$scope.users = []
	$scope.userLookup = {}
	$scope.userStatus = {}

	var getMessages = function(){
		$http.get("https://tiy-chat-server.herokuapp.com/messages/recent")
			.success(function(data){
				$scope.messages = data

				angular.forEach($scope.messages, function(message){

					/*var myUser
					angular.forEach($scope.users, function(user){
						//console.log(user._id)
						if (user._id === message._id) {

							message.username = user.username
						}
					})*/
			
		
					message.time = moment(message.timestamp).format("dddd hh:mm")
					//console.log(message)
				})
			}).error(function(){
				console.log('no')
			})
	}

	var getUsers=function(){
		$http.get("https://tiy-chat-server.herokuapp.com/user")
			.success(function(data){
				$scope.users = data
				angular.forEach($scope.users, function(user){
					$scope.userLookup[user._id] = user.username
					$scope.userStatus[user._id] = user.status
				})
				//console.log($scope.userLookup)
				//console.log(data)
			})
	}

	$scope.submitMessage=function(){
		if (!$scope.user_id) {
			alert("You must be someone to chat!")
			return
		}

		$http.post("https://tiy-chat-server.herokuapp.com/message", {
			text: $scope.messageText,
			user_id: $scope.user_id,
			status: $scope.currentStatus,
		})
			.success(function(data){
				console.log("poo")

			}).error(function(){
				console.log('no')
			})
	}

	$scope.changeStatus=function(){
		if (!$scope.user_id) {
			return
		}

		$http.put("https://tiy-chat-server.herokuapp.com/user", {
			status: $scope.currentStatus,
			user_id: $scope.user_id,
		})
			.success(function(){
				console.log("Sttus changed")
			})
	}

	$scope.createUser=function(){
		if (!$scope.userName) {
			alert("you need a name")
			return
		}
		console.log($scope.newStatus, $scope.userName, $scope.fullName)

		$http.post("https://tiy-chat-server.herokuapp.com/user", {
			status: $scope.newStatus,
			username: $scope.userName,
			fullname: $scope.fullName,

		})
			.success(function(){
				console.log("user added")
			})
	}

	$scope.toggleTabs=function(){
		$scope.active.compose = !$scope.active.compose
		$scope.active.create = !$scope.active.create
	}


	getUsers()
	getMessages()



})