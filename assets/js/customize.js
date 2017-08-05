
    $(document).ready(function() {
      //常见问题tips
      var statu = $.cookie('ib_showAllQuestions');
      if (!statu) {
        $('.all-questions').css('display','block');
        $.cookie('ib_showAllQuestions','true',{ expires: 10000 });
      }
      $('.close-question').click(function(){ 
        $('.all-questions').slideUp(500); 
      });
      $('.open-questions').click(function(){
        $('.all-questions').slideDown(500);
      });


      var flag = true;
      gridlist();
      $("#ot-add").click(function(){
        $("#ot-addform").css("display","block");
        $("#ot-add").addClass("hn");
        $(".cbp-vm-options").addClass("hn");
        $("#ot-empty").css("display","none");
        $('.ot-delete').removeAttr('onclick');
        flag = false;
      });

      $("div").delegate(".btn_cancel","click",function(){ 
          cancel();
      }); 
      function cancel(){
        $("#ot-addform").css("display","none");
        // $("#ot-empty").css("display","block");
        $("#ot-add").removeClass("hn");
        $(".cbp-vm-options").removeClass("hn");
         flag = true;
      }
      $('#ot-addform .btn_cancel').click(function(){
        var customid = 0;

        $.ajax({
          type:"POST",
          url:ctx + "Resume/customizecheck",
          data:{
          customid: customid,
        },
          success:function(b) {
            var b = jQuery.parseJSON(b);
            console.log(b);
            //console.log(b.content.customize);
            custom = b.content.customize;
            cancel();
            $('#customize_list').removeClass('dn');
            customlist(custom);
            $("#addCustomForm").get(0).reset(); 
          }
        });
        return false;
      });

    $("#addCustomForm").validate({
     rules: {
      "title": {
        required: !0,
        maxlength: 150
      },
      "content":{
        required: !0,
        maxlength: 1000
      }
    },
    messages: {

      "title": {
        required:"必填",
        maxlength: "请输入1-150个字符"
      },
      "content":{
        required:"必填",
        maxlength: "请输入1-1000个字符"
      }
        
    },
      errorPlacement: function(a, b) {
        $(b).after(a)
      },
      submitHandler: function(a) {
        var customid = $('input[name="customid"]').val();
        var title = $('input[name="title"]').val();
        var content = $('textarea[name="content"]').val();
        $('#addCustomForm').find(":submit").val("保存中...").attr("disabled", !0), 
         $.ajax({
          type:"POST",
          url:ctx + "Resume/customizeedit",
          data:{
          customid: customid,
          title: title,
          content: content,
        },
          success:function(b) {
            var b = jQuery.parseJSON(b);
            //console.log(b);
            //console.log(b.content.customize);
            custom = b.content.customize;
            cancel();
             
            $('.cuslist_contrainer').removeClass('dn');
            $('#customize_list').removeClass('dn');
            customlist(custom);
            $("#addCustomForm").get(0).reset(); 
            $('#addCustomForm').find(":submit").val("保存").attr("disabled", false);
          }
        });
      }
    });
    $("#upCustomForm").validate({
     rules: {
      "title": {
        required: !0,
        maxlength: 100
      },
      "content":{
        required: !0,
        maxlength: 1000
      }
    },
    messages: {

      "title": {
        required:"必填",
        maxlength: "请输入1-100个字符"
      },
      "content":{
        required:"必填",
        maxlength: "请输入1-1000个字符"
      }
        
    },
      errorPlacement: function(a, b) {
        $(b).after(a)
      },
      submitHandler: function(a) {
         var customid = $('#upCustomForm input[name="customid"]').val();
        var title = $('#upCustomForm input[name="title"]').val();
        var content = $('#upCustomForm textarea[name="content"]').val();
        $('#upCustomForm').find(":submit").val("保存中...").attr("disabled", !0), 
        $.ajax({
          type:"POST",
          url:ctx + "Resume/customizeedit",
          data:{
          customid: customid,
          title: title,
          content: content,
        },
          success:function(b) {
            var b = jQuery.parseJSON(b); 
            //console.log(b);
            //console.log(b.content.customize);
            custom = b.content.customize;
            customlist(custom);
            $("#upCustomForm").get(0).reset();
            $('#upCustomForm').find(":submit").val("保存").attr("disabled", false);
          }
        });
      }
    });
      // $('#addCustomForm .mr_save').click(function(){
      //   var customid = $('input[name="customid"]').val();
      //   var title = $('input[name="title"]').val();
      //   var content = $('textarea[name="content"]').val();
  
      //   $.ajax({
      //     type:"POST",
      //     url:ctx + "Resume/customizeedit",
      //     data:{
      //     customid: customid,
      //     title: title,
      //     content: content,
      //   },
      //     success:function(b) {
      //       var b = jQuery.parseJSON(b);
      //       //console.log(b);
      //       //console.log(b.content.customize);
      //       custom = b.content.customize;
      //       cancel();
      //       $('#customize_list').removeClass('dn');
      //       customlist(custom);
      //       $("#addCustomForm").get(0).reset(); 
      //     }
      //   });
      //   return false;
      // });
      //  $('#upCustomForm .mr_save').click(function(){
      //   //submitcustomform();
      //   var customid = $('#upCustomForm input[name="customid"]').val();
      //   var title = $('#upCustomForm input[name="title"]').val();
      //   var content = $('#upCustomForm textarea[name="content"]').val();

      //   $.ajax({
      //     type:"POST",
      //     url:ctx + "Resume/customizeedit",
      //     data:{
      //     customid: customid,
      //     title: title,
      //     content: content,
      //   },
      //     success:function(b) {
      //       var b = jQuery.parseJSON(b); 
      //       //console.log(b);
      //       //console.log(b.content.customize);
      //       custom = b.content.customize;
      //       customlist(custom);
      //       $("#upCustomForm").get(0).reset();
            
      //     }
      //   });
      //   return false;
      // });
      $("div").delegate(".ot-delete","click",function(){ 
        if(flag){
          var _PageHeight = document.documentElement.clientHeight,
              _PageWidth = document.documentElement.clientWidth;
          var _LoadingTop = _PageHeight > 120 ? _PageHeight  / 2 : 0,
              _LoadingLeft =  _PageWidth  / 2 + 100;

          console.log(_PageHeight,_LoadingTop);
          var title =$(this).parent().attr("data-title");
          var customid =$(this).parent().attr("data-customid");
          $(".ot_del_ok").attr("data-id", customid);
          if (title.length >=20) {
            var title =  title.substring(0, 20);
          $('.ot_delete_title').text('"'+title+'..."');
          }else{
            $('.ot_delete_title').text('"'+title+'"');
          }
          $(".ot_delete_pop").css('top',_LoadingTop);
          $(".ot_delete_pop").css('left',_LoadingLeft);
          $(".ot_delete_pop").css('position','fixed');
          $(".ot_delete_pop").removeClass("dn");
        }
      }); 


      $(".ot_delete_pop").delegate(".ot_del_cancel","click",function(){ 
          $(".ot_delete_pop").addClass("dn");
      }); 

      $("#customize_list").delegate(".cbp-vm-title","mouseover",function(){ 
         $(this).toggleClass("ot-current");
      }); 
       $("#customize_list").delegate(".cbp-vm-title","mouseout",function(){ 
       $(this).toggleClass("ot-current");
      }); 

      $("div").delegate(".icon-otedit","click",function(){ 
        if (flag) {
          var customid =$(this).parent().attr("data-customid");
          var title =$(this).parent().attr("data-title");
          var content =$(this).parent().attr("data-content");
          $('#upCustomForm').removeClass('dn');
          $('#upCustomForm input[name="title"]').val(title);
          $('#upCustomForm input[name="customid"]').val(customid);
          $('#upCustomForm textarea[name="content"]').val(content);
          $('#customize_list').addClass('dn');
        }
        
      }); 

        $('#upCustomForm .btn-resumeac').click(function(){
          $('#upCustomForm').addClass('dn');
          $('#customize_list').removeClass('dn');
        });

        $(".ot_delete_pop").delegate(".ot_del_ok", "click", function() {
          
          var customid =$(this).attr("data-id");
          $.ajax({
            type:"POST",
            url:ctx + "Resume/delCustomize",
            data:{
            customid: customid,
          },
            success:function(b) {
              var b = jQuery.parseJSON(b); 
              //console.log(b);
              //console.log(b.content.customize);
              custom = b.content.customize;
              $(".ot_delete_pop").addClass('dn');
              customlist(custom);
            }
          });
        });

    });

    function customlist(a) {
      //console.log(a);
      var c, b = "";
      if (a != "") {
        $('#ot-empty').css('display','none');
        for (c = 0; c < a.length; c++)
          if (a[c].title.length >=20) {
              b += '<li class="z_i"><h3 class="cbp-vm-title">' + a[c].title.substring(0, 20)+'...' + '<div id="ot-righticon"data-customid="' + a[c].id + '"data-title="' + a[c].title + '"data-content="' + a[c].content + '"><a class="nc-icon-glyph ui-1_trash icon-resume-icon ot-delete"></a><a class="nc-icon-glyph ui-1_pencil icon-resume-icon icon-otedit"></a></div></h3><div class="cbp-vm-details"><pre>' + a[c].content + '</pre></div></li>';
              $('#customize_list').html(b);
          }else{
             b += '<li class="z_i"><h3 class="cbp-vm-title">' + a[c].title + '<div id="ot-righticon"data-customid="' + a[c].id + '"data-title="' + a[c].title + '"data-content="' + a[c].content + '"><a class="nc-icon-glyph ui-1_trash icon-resume-icon ot-delete"></a><a class="nc-icon-glyph ui-1_pencil icon-resume-icon icon-otedit"></a></div></h3><div class="cbp-vm-details"><pre>' + a[c].content + '</pre></div></li>';
              $('#customize_list').html(b);
          }
       
      }else if (a == "") {
        $('#ot-empty').css('display','block');
        $('#customize_list').addClass('dn');
        $('.cuslist_contrainer').addClass('dn');
        

      }
    
    }
     