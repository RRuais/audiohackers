(function() {
    angular.module('mainApp')
        .controller('MicrophoneController', ['$scope', '$http', '$location', '$cookies', '$rootScope', 'MessageFactory', 'UsersFactory', '$stateParams', 'AuthFactory', function($scope, $http, $location, $cookies, $rootScope, mf, uf, $stateParams, AuthFactory) {



            $scope.checkUser = function() {
                if (AuthFactory.isLoggedIn()) {
                    return true;
                } else {
                    return false;
                };
            };

            $scope.isAdmin = function() {
                if (AuthFactory.checkAdminStatus()) {
                    return true;
                } else {
                    return false;
                };
            };

            $scope.postMicrophone = function() {
                var microphone = {
                    manufacturer: $scope.mic.manufacturer,
                    model: $scope.mic.model,
                    pickupPatterns: $scope.mic.pickupPatterns,
                    type: $scope.mic.type,
                    impedance: $scope.mic.impedance,
                    pads: $scope.mic.pads,
                    filters: $scope.mic.filters,
                    phantomPower: $scope.mic.phantomPower,
                    image: `/app/assets/images/micImages/${$scope.mic.image}`,
                    splNoise: $scope.mic.splNoise,
                    description: $scope.mic.description
                };
                $http.post('api/microphones/', microphone)
                    .then(function(returnedMic) {
                        console.log(returnedMic);
                        allMicrophones();
                    }).catch(function(err) {
                        console.log(err);
                    });
            };

            $scope.updateMicrophone = function() {
                $http.patch('api/microphones/update/', $scope.mic)
                    .then(function(returnedMic) {
                        console.log(returnedMic);
                        microphoneDetails();
                    }).catch(function(err) {
                        console.log(err);
                    });
            };


            function removeMicrophone(micId) {
                $http.delete(`api/microphones/${micId}`)
                    .then(function(response) {
                        allMicrophones();
                        console.log(response);
                    }).catch(function(err) {
                        console.log(err);
                    })
            };

            $scope.deleteMicrophone = function(micId) {
                removeMicrophone(micId);

            };

            function microphoneDetails() {
                var microphone = JSON.parse($cookies.get('microphone'));
                $scope.mic = microphone;
            };

            $scope.getMicrophoneDetails = function() {
                microphoneDetails();
            };

            $scope.goToMicrophoneDetails = function(mic) {
                $cookies.put('microphone', JSON.stringify(mic))
                $location.url('microphoneDetails')
            };

            $scope.postMessage = function(micId) {
                var user = JSON.parse($cookies.get('auth'));
                var topic = JSON.parse($cookies.get('topic'));
                var newMessage = {
                    userId: user.data.id,
                    userEmail: user.data.email,
                    content: $scope.content,
                    micId: micId,
                    title: $scope.title
                };
                mf.postMessage(newMessage, function(message) {

                });
                $scope.content = '';
                $scope.title = '';
                $('.modal').modal('hide');
                var microphone = JSON.parse($cookies.get('microphone'));
                messagesFromMicId(microphone._id);
            };

            $scope.deleteMessage = function(messageId) {
                var loggedUser = JSON.parse($cookies.get('auth'))
                mf.deleteMessage(messageId, loggedUser.data._id);
                var microphone = JSON.parse($cookies.get('microphone'));
                messagesFromMicId(microphone._id);
                $location.url('microphoneDetails');
            };

            $scope.checkUserForDelete = function(userId) {
                if ($cookies.get('auth')) {
                    var loggedUser = JSON.parse($cookies.get('auth'));
                    if (loggedUser.data.id === userId) {
                        return true;
                    } else {
                        return false;
                    };
                };
            };

            function messagesFromMicId(micId) {
                mf.getMessagesFromMicId(micId, function(messages) {
                    messages.data.forEach(function(message) {
                        var id = message.userId;
                        uf.findById(id, function(user) {
                            var userImage = user.data.image;
                            message.userImage = userImage;
                        });
                    });
                    $scope.messages = messages.data;
                })
            };

            $scope.getMessagesFromMicId = function(micId) {
                messagesFromMicId(micId);
            };

            $scope.updateMessage = function(messageData) {
                let message = {
                    messageId: messageData.id,
                    content: messageData.content
                };
                mf.updateMessage(message);
                $scope.message = '';
                $('.modal').modal('hide');
            };

            $scope.updateMessageFromComments = function(messageData) {
                let message = {
                    messageId: messageData.id,
                    content: messageData.content
                };
                mf.updateMessage(message);
                $scope.message = '';
                $('.modal').modal('hide');
                showMicrophoneComments();
            };

            function showMicrophoneComments() {
                messageId = $stateParams.id;
                mf.getMessage(messageId, function(message) {
                    uf.findById(message.data.userId, function(user) {
                        let currentMessage = message.data;
                        currentMessage.userImage = user.data.image;
                        $scope.message = currentMessage;
                        mf.getComments(messageId, function(comments) {
                            comments.data.forEach(function(comment) {
                                uf.findById(comment.userId, function(user) {
                                    comment.userImage = user.data.image;
                                })
                            })
                            $scope.comments = comments.data;
                            microphoneDetails();
                        })
                    })
                })
            };

            $scope.showComments = function() {
                showMicrophoneComments();
            };

            $scope.postComment = function(mesageId) {
                let user = JSON.parse($cookies.get('auth'));
                let comment = {
                    content: $scope.content,
                    userId: user.data.id,
                    userEmail: user.data.email,
                    messageId: messageId
                };
                mf.postComment(comment);
                $scope.content = "";
                $('.modal').modal('hide');
                showMicrophoneComments()
            };

            function deleteComment(commentId) {
                mf.deleteComment(commentId);
            };

            $scope.delete = function(commentId, messageId) {
                mf.deleteComment(commentId, messageId);
                showMicrophoneComments();
            };

            $scope.updateComment = function(ids) {
                let user = JSON.parse($cookies.get('auth'));
                let comment = {
                    content: ids.content,
                    userId: user.data.id,
                    userEmail: user.data.email,
                    messageId: ids.messageId,
                    commentId: ids.commentId
                };
                mf.updateComment(comment);
                $scope.comment2 = "";
                $('.modal').modal('hide');
                showMicrophoneComments()
            };


            //////////////////// Filter Microphone Functions ////////////////////

            function allMicrophones() {
                $http.get('api/microphones/')
                    .then(function(microphones) {
                        $scope.microphones = microphones.data;
                    }).catch(function(err) {
                        console.log(err);
                    });
            };

            $scope.getAllMicrophones = function() {
                allMicrophones();
            };


            $scope.listOfTypes = ['All Types', 'Dynamic', 'Condenser', 'Ribbon', 'Condenser - Lavalier', 'Condenser - Tube'];
            $scope.listOfManufacturers = ['All Manufacturers', 'Akg Acoustics', 'Sure', 'Sennheiser', 'Blue Microphones'];

            var isFilteredType = false;
            var isFilteredManufacturer = false;
            var filteredMicsType;
            var filteredMicsManufacturer;
            $scope.selectedItem = $scope.listOfTypes[0];
            $scope.selectedItem2 = $scope.listOfManufacturers[0];

            $scope.filterByType = function() {

                if (isFilteredManufacturer) {
                    var mics = []
                    filteredMicsManufacturer.forEach(function(mic) {
                        if ($scope.selectedItem === 'All Types') {
                            mics.push(mic);
                        };
                        if (mic.type === $scope.selectedItem) {
                            mics.push(mic);
                        };
                    });
                    if ($scope.selectedItem === 'All Types') {
                        isFilteredType = false;
                        $scope.microphones = mics;
                    } else {
                        isFilteredType = true;
                        filteredMicsType = mics;
                        $scope.microphones = mics;
                    }
                } else {
                    $http.get('api/microphones/')
                        .then(function(microphones) {
                            var mics = []
                            microphones.data.forEach(function(mic) {
                                if ($scope.selectedItem === 'All Types') {
                                    mics.push(mic);
                                };
                                if (mic.type === $scope.selectedItem) {
                                    mics.push(mic);
                                };
                            });
                            if ($scope.selectedItem === 'All Types') {
                                isFilteredType = false;
                                $scope.microphones = mics;
                            } else {
                                isFilteredType = true;
                                filteredMicsType = mics;
                                $scope.microphones = mics;
                            }
                        }).catch(function(err) {
                            console.log(err);
                        });
                };
            };

            $scope.filterByManufacturer = function() {
                if (isFilteredType) {
                    var mics = []
                    filteredMicsType.forEach(function(mic) {
                        if ($scope.selectedItem2 === 'All Manufacturers') {
                            mics.push(mic);
                        };
                        if (mic.manufacturer === $scope.selectedItem2) {
                            mics.push(mic);
                        };
                    });
                    if ($scope.selectedItem2 === 'All Manufacturers') {
                        isFilteredManufacturer = false;
                        $scope.microphones = mics;
                    } else {
                        isFilteredManufacturer = true;
                        filteredMicsManufacturer = mics;
                        $scope.microphones = mics;
                    };
                } else {
                    $http.get('api/microphones/')
                        .then(function(microphones) {
                            var mics = []
                            microphones.data.forEach(function(mic) {
                                if ($scope.selectedItem2 === 'All Manufacturers') {
                                    mics.push(mic);
                                };
                                if (mic.manufacturer === $scope.selectedItem2) {
                                    mics.push(mic);
                                };
                            })
                            if ($scope.selectedItem2 === 'All Manufacturers') {
                                isFilteredManufacturer = false;
                                $scope.microphones = mics;
                            } else {
                                isFilteredManufacturer = true;
                                filteredMicsManufacturer = mics;
                                $scope.microphones = mics;
                            };
                        }).catch(function(err) {
                            console.log(err);
                        });
                };
            };

            $scope.resetFilter = function() {
                allMicrophones();
                isFilteredType = false;
                isFilteredManufacturer = false;
                $scope.selectedItem = $scope.listOfTypes[0];
                $scope.selectedItem2 = $scope.listOfManufacturers[0];
            };

            //Pagination
            $scope.currentPage = 0;
            $scope.pageSize = 9;

            $scope.tinymceOptions = {
                selector: 'textarea',
                plugins: 'emoticons media table spellchecker',
                resize: false,
                statusbar: true,
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | emoticons',
                elementpath: false,
                menubar: true,
                menubar: 'file edit insert view format table tools',
                menu: {
                    file: {title: 'File', items: 'newdocument'},
                    edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
                    insert: {title: 'Insert', items: 'link media | template hr'},
                    view: {title: 'View', items: 'visualaid'},
                    format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
                    table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
              }
            };


        }]); // End Controller
}()); // End Anonymous Function
