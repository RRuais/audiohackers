(function() {
    angular.module('mainApp')
        .controller('MessageController', ['$scope', '$location', '$cookies', '$rootScope', '$http', 'MessageFactory', 'UsersFactory', '$stateParams', 'AuthFactory', '$filter', function($scope, $location, $cookies, $rootScope, $http, mf, uf, $stateParams, AuthFactory, $filter) {

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

            $scope.postMessage = function() {
                var user = JSON.parse($cookies.get('auth'));
                var topic = JSON.parse($cookies.get('topic'));
                var newMessage = {
                    userId: user.data.id,
                    userEmail: user.data.email,
                    content: $scope.content,
                    topic: topic.topicId,
                    title: $scope.title
                };
                mf.postMessage(newMessage, function(message) {

                });
                $scope.message = '';
                $('.modal').modal('hide');
                messagesFromTopic();
            };

            $scope.updateMessage = function(messageData) {
                let message = {
                    messageId: messageData.id,
                    content: messageData.content
                };
                mf.updateMessage(message);
                $scope.message = '';
                $('.modal').modal('hide');
                messagesFromTopic();
            };

            $scope.updateMessageFromComments = function(messageData) {
                let message = {
                    messageId: messageData.id,
                    content: messageData.content
                };
                mf.updateMessage(message);
                $scope.message = '';
                $('.modal').modal('hide');
                showMessageComments();
            };

            function allMessages() {
                mf.getAllMessages(function(messages) {
                    messages.data.forEach(function(message) {
                        var id = message.userId;
                        uf.findById(id, function(user) {
                            var userImage = user.data.image;
                            message.userImage = userImage;
                        })
                    })
                    $scope.messages = messages.data;
                });
            };

            $scope.getAllMessages = function() {
                allMessages();
            };

            $scope.deleteMessage = function(messageId) {
                var loggedUser = JSON.parse($cookies.get('auth'))
                mf.deleteMessage(messageId, loggedUser.data._id);
                messagesFromTopic();
                $location.url('messageBoard');
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

            $scope.checkUserForDeleteComment = function(userId) {
                if ($cookies.get('auth')) {
                    var loggedUser = JSON.parse($cookies.get('auth'));
                    if (loggedUser.data.id === userId) {
                        return true;
                    } else {
                        return false;
                    };
                };
            };

            function userMessages() {
                var loggedUser = JSON.parse($cookies.get('auth'))
                mf.getUserMessages(loggedUser.data.id, function(messages) {
                    messages.data.forEach(function(message) {
                        var id = message.userId;
                        uf.findById(id, function(user) {
                            var userImage = user.data.image;
                            message.userImage = userImage;
                        });
                    });
                    $scope.messages = messages.data;
                });
            };

            $scope.getUserMessages = function() {
                userMessages();
            };

            function friendsMessages() {
                var totalMessages = [];
                var loggedUser = JSON.parse($cookies.get('auth'));
                uf.findById(loggedUser.data.id, function(user) {
                    user.data.following.forEach(function(userId) {
                        if (userId != null) {
                            mf.getUserMessages(userId, function(messages) {
                                messages.data.forEach(function(message) {
                                    var id = message.userId;
                                    uf.findById(id, function(user) {
                                        var userImage = user.data.image;
                                        message.userImage = userImage;
                                    });
                                    totalMessages.push(message)
                                });
                            })
                        };
                    });
                });
                $scope.messages = totalMessages;
            };

            $scope.getFriendsMessages = function() {
                friendsMessages();
            };

            //////////////////// Comments ////////////////////

            function showMessageComments() {
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
                        })
                    })
                })
            };

            $scope.showComments = function() {
                showMessageComments();
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
                showMessageComments()
            };

            function deleteComment(commentId) {
                mf.deleteComment(commentId);
            };

            $scope.delete = function(commentId, messageId) {
                mf.deleteComment(commentId, messageId);
                showMessageComments();
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
                showMessageComments()
            };


            //////////////////// Topics ////////////////////


            $scope.postTopic = function() {
                var topic = {
                    title: $scope.topic,
                    category: $scope.category
                };
                mf.postTopic(topic);
                $('.modal').modal('hide');
                topics();
            };

            function topics() {
                mf.getTopics(function(topics) {
                    //Get All Topics and their messages
                    topics.data.forEach(function(topic) {
                        mf.getMessagesFromTopic(topic._id, function(messages) {
                            if (messages.data) {
                                $scope.topicMessageCount = messages.data.length;
                                topic.count = messages.data.length;
                            };
                        });
                    });
                    //Filter topics by category
                    var hardwareTopics = [];
                    var softwareTopics = [];
                    topics.data.forEach(function(topic) {
                        if (topic.category === 'Software') {
                            softwareTopics.push(topic);
                        };
                        if (topic.category === 'Hardware') {
                            hardwareTopics.push(topic)
                        };
                    });
                    $scope.hardwareTopics = $filter('orderBy')(hardwareTopics, 'title');
                    $scope.softwareTopics = $filter('orderBy')(softwareTopics, 'title');
                });
            };

            $scope.getTopics = function() {
                topics();
            };

            function messagesFromTopic(data) {
                var topic = JSON.parse($cookies.get('topic'));
                mf.getMessagesFromTopic(topic.topicId, function(messages) {
                    if (messages.data) {
                        messages.data.forEach(function(message) {
                            var id = message.userId;
                            uf.findById(id, function(user) {
                                var userImage = user.data.image;
                                message.userImage = userImage;
                            });
                        });
                        $scope.topicId = topic.topicId;
                        $scope.topicTitle = topic.title;
                        $scope.messages = messages.data;
                    }
                })
            };

            $scope.getMessagesFromTopic = function() {
                messagesFromTopic();
            };

            $scope.goToMessageBoard = function(data) {
                $cookies.put('topic', JSON.stringify(data))
                $location.url('messageBoard')
            };

            function removeTopic(topicId) {
                mf.deleteTopic(topicId);
                topics();
            };

            $scope.deleteTopic = function(topicId) {
                removeTopic(topicId);
            };

            //Filter Software Topics Pagination
            $scope.currentPage = 0;
            $scope.pageSize = 6;

            //Filter Hardware Topics Pagination
            $scope.currentPage2 = 0;
            $scope.pageSize2 = 6;

            $scope.tinymceOptions = {
                selector: 'textarea',
                plugins: 'emoticons media table',
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


        }]) // End Controller
        //Pagination Filter
        .filter('startFrom', function() {
            return function(data, start) {
                if (data != null) {
                    return data.slice(start);

                }
            }
        })
}()); // End Anonymous Function
