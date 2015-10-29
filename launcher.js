/*Dependency: jQuery*/
(function ($){
  var s = {
    checkHash : true,
    repeat: false,
    delay : 3000
  },
  prevHash = 0;
  function hashCode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  }
  $.fn.bindLauncher = function(){
    console.log("bindLauncher", arguments, this);
  };

  $.fn.setRepeater = function(settings){
    var run = s.repeat;
    if(settings===undefined || settings.repeat===undefined) s.repeat = !s.repeat;
    if(settings) $.extend(s,settings);
    if(s.repeat && !run) repeater();
  }
  function get(){
    $.ajax({
      method: "GET",
      url: "run.js",
      dataType: "text",
      cache: false
    }).done(received);
  }

  function received(text){
    if(s.checkHash){
      if(prevHash!==hashCode(text)){
        prevHash = hashCode(text);
        run(text);
      }
    }else{
      run(text);
    }
    if(s.repeat) repeater();
  }

  function run(text){
    eval(text);
  }

  function repeater(){
    setTimeout(get, s.delay);
  }
})(jQuery);
