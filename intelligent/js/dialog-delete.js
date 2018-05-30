$(function(){
  $('.delete').off().click(function(){

      $( ".dialog-del" ).dialog({
        modal:true,
        resizable: false,
        closeOnEscape: false,
        show: {
          effect: "explode",
          duration: 100
        },
        hide: {
          effect: "explode",
          duration: 100
        }
      });
    });

    $('.dialog-close').off().click(function(){
      $( ".dialog-del" ).dialog('destroy');
    });
});