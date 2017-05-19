angular.module('app', [])
.controller('DataController', ['$scope', function($scope){
  var places = [];
  for(var i = 1; i <= 1000; i++){
    places.push(i);
  }
  $scope.name = 'brandi';
  $scope.birthdate = '1985-09-11';
  $scope.lotteryWinnings = 50000;
  $scope.thingsILike = ['cat', 'coconut', 'wine', 'barbecue', 'karaoke']
  $scope.nums = places;
  $scope.octopus = {length: 1};
}])
.filter('reverse', function(){
   return function(word){
      return word.split('').reverse().join('');
   }
})
.filter('nth', function(){
  return function(i){
    if(i % 10 === 1 && i % 100 !== 11){
      return i.toString() + 'st place';
    }
    else if(i % 10 === 2 && i % 100 !== 12){
      return i.toString() + 'nd place';
    }
    else if(i % 10 === 3 && i % 100 !== 13){
      return i.toString() + 'rd place';
    }
    else{
      return i.toString() + 'th place';
    }
  }
})
.filter('pluralizer', function(){
  return function(length, singular, plural){
    if(length === 1){
      return singular;
    }
    return plural;
  }
})
.filter('filesize', function(){
  return function(num, fixed){
    if(num >= 1000000){
      return (num / 1000000).toFixed(fixed) + 'GB';
    }
    else if(num >= 1000){
      return (num / 1000).toFixed(fixed) + 'MB';
    }
    else {
      return num + 'KB';
    }
  }
})
.filter('primes', function(){
  var isPrime = function(num){
    if(num <= 1){
      return false;
    }
    else if(num === 2){
      return true;
    }
    else{
      for(var i = 2; i <= Math.ceil(Math.sqrt(num)); i++){
        if(num % i === 0){
          return false;
        }
      }
      return true;
    }
  }

  return function(nums){
    return nums.filter(isPrime);
  }
})
.filter('ago', function(pluralizerFilter){
  return function(agoDate){
    var then = new Date(agoDate);
    var now = new Date();

    var years = now.getFullYear() - then.getFullYear();
    console.log("yrs", years);

    //Try years
    if(years >= 1){
      return years.toString() + pluralizerFilter(years, ' year', ' years') + ' ago';
    }
    else {
      //Try months
      var months = now.getMonth() - then.getMonth();
      if(months >= 1){
        return months.toString() + pluralizerFilter(months, ' month', ' months') + ' ago';
      }
      else {
        //Try days
        var days = now.getDay() - then.getDay();
        if(days >= 1){
          return days + pluralizerFilter(days, ' day', ' days') + ' ago';
        }
        else{
          //Try hours
          var hours = now.getHours() - then.getHours();
          if(hours >= 1){
            return hours + pluralizerFilter(hours, ' hour', ' hours') + ' ago';
          }
          else{
            //Try minutes
            var minutes = now.getMinutes() - then.getMinutes();
            if(minutes >= 1){
              return minutes + pluralizerFilter(minutes, ' minute', ' minute') + ' ago';
            }
            else {
              //Try seconds
              var seconds = now.getSeconds() - then.getSeconds();
              if(seconds >= 3){
                return seconds + pluralizerFilter(seconds, ' seconds', ' seconds') + ' ago';
              }
              else {
                return "mere moments ago!";
              }
            }
          }
        }
      }
    }
  }
});
