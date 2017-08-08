
		jquery(function() {
			jquery(".ic-dashed-item").each(function(){
				if(jquery(this).hasClass('active')){
					var a =jquery(this).parent().offset().top-305;
					console.log(jquery(this).parent().offset().top-305);
					jquery(this).parent().parent().parent().parent().css('transform','translate3d(0px, -'+a+'px, 0px)');
					return false;
				}
			});
		});
		 function nextVideo() {
	        player.changeVid("02bfeb00e27ff92a76364b16af2f115e_0");
	    }
	    function once(func) {
	        var ran,
	            result;
	        if (!isFunction(func)) {
	          throw new TypeError(funcErrorText);
	        }
	        return function() {
	          if (ran) {
	            return result;
	          }
	          ran = true;
	          result = func.apply(this, arguments);
	          // clear the `func` variable so the function may be garbage collected
	          func = null;
	          return result;
	        };
	   }
	    function render() {
	        if (player != undefined && player.j2s_stayInVideoTime != undefined && player.j2s_realPlayVideoTime != undefined && player.j2s_getCurrentTime != undefined && player.j2s_getDuration != undefined && player.j2s_getFlowCount != undefined) {
	            var sec1 = player.j2s_stayInVideoTime();
	            var sec2 = player.j2s_getCurrentTime();
	            var sec3 = player.j2s_getDuration();
	            var sec4 = player.j2s_realPlayVideoTime();
	            var byte = player.j2s_getFlowCount();
	            if(sec2 == 15) recordstart();
	            if(sec2 + 15 == sec3) changestate();
	        }
	    }
	    function recordstart(){
	      var vid = $("#currentvid").val();
	      var time = Date.parse(new Date())/1000;
	    jquery.ajax({
	      type : 'POST',
	      url : '/academy/recordstart',
	      data : {
	        'vid' : vid,
	        'time' : time,
	      },
	      success : function(data){
	      //  alert(data.status);
	      return;
	      }
	      })
	    }
	    function changestate(){
	      var vid = jquery("#currentvid").val();
	      var time = Date.parse(new Date())/1000;
	    jquery.ajax({
	      type : 'POST',
	      url : '/academy/changestatus',
	      data : {
	        'vid' : vid,
	        'time' : time,
	      },
	      success : function(data){
	      //  alert(data.status);
	      }
	      })
	    }
	    var interval = setInterval("render()", 500);


		mui('.ic-input-comment').on('tap', '.ic-btn-course-commnet', function(e) {
			var _comment ,_pid ,_vid ,_uid ,_length;
			 _comment =document.querySelector('.ic-input-comment input.comment-text').value;
			 _pid =document.querySelector('.ic-input-comment input[name="pid"]').value;
			 _vid =document.querySelector('.ic-input-comment input[name="vid"]').value;
			 _uid =document.querySelector('.ic-input-comment input[name="uid"]').value;
			 _length = _comment.length;
			 console.log(_length);
			if ( 300 >= _length && _length > 0) {
				document.querySelector('.ic-input-comment input.comment-text').value = '';
				//mui.toast(_length);
				mui.post(ctx + "Academy/addComment",{
					comment:_comment,pid:_pid,vid:_vid,uid:_uid
					},function(data){
						console.log(data);
						videoCommentListCb(data);
						mui.toast('发送成功');
					},'json'
				);
			}else if (_length > 300){
				mui.toast('字数超出300个字符!');
			}else{
				mui.toast('提问内容不能为空!');
			}
			return false;
		});
		mui('.ic-course-comment-list').on('tap', '.comment-delete', function(e) {
			var _uid ,_pid ,_vid;
			 _cid =this.getAttribute('data-cid');
			 _vid =this.getAttribute('data-vid');

			mui.post(ctx + "Academy/delComment",{
				cid:_cid,vid:_vid
				},function(data){
					console.log(data);
					videoCommentListCb(data);
					mui.toast('删除成功');
				},'json'
			);
		}); 

		mui('.ic-course-comment-list').on('tap', '.add-comment-reply', function(e) {
			var _uid ,_pid ,_vid,_htmlString;
			_pid =this.getAttribute('data-pid');
			_vid =this.getAttribute('data-vid');
			_uid =this.getAttribute('data-uid');
			
			_htmlString = '<div class="ic-comment-reply-container"><textarea class="ic-comment-reply"></textarea><button class="ic-btn btn-comment-reply ic-btn-primary " data-pid="'+_pid+'" data-uid="'+_uid+'" data-vid="'+_vid+'" ">提交</button></div>';
			//ic-comment-reply-container
			if (this.classList.contains('open')) {
				var nextC = this.parentNode.nextElementSibling;
				this.classList.remove('open');
				this.parentNode.nextElementSibling.removeChild;
				nextC.parentNode.removeChild(nextC);
			}else{
				this.classList.add('open');
				this.parentNode.insertAdjacentHTML('afterend', _htmlString);
			}
		});

		mui('.ic-course-comment-list').on('tap', '.btn-comment-reply', function(e) {
			var _uid ,_pid ,_vid,_raplycon;
			_raplycon =document.querySelector('.ic-comment-reply').value;
			if (_raplycon) {
				document.querySelector('.ic-comment-reply').value ='';
				_uid =this.getAttribute('data-uid');
				_pid =this.getAttribute('data-pid');
				_vid =this.getAttribute('data-vid');
				mui.post(ctx + "Academy/addComment",{
					pid:_pid,vid:_vid,uid:_uid,comment:_raplycon
					},function(data){
						console.log(data);
						videoCommentListCb(data);
						mui.toast('回复成功');
					},'json'
				);
			}else{
				mui.toast('回复不能为空!');
			}
			 
		});

		mui('.ic-course-comment-list').on('tap', '.agree', function(e) {
			var _uid ,_vote ,_cid,_obj;
			_obj = this;
			_vote =this.getAttribute('data-vote');
			_cid =this.getAttribute('data-cid');
			
			mui.post(ctx + "Academy/addAgree",{
				vote: _vote,cid: _cid,
				},function(data){
					console.log(data);
					switch (data['status']) {
			          case '1':
			          	_obj.classList.remove('nc-icon-outline');
			          	_obj.classList.remove('action-unlike');
			          	_obj.classList.add('nc-icon-glyph');
			          	_obj.classList.add('action-like');
			          	 _obj.previousElementSibling.innerHTML = data['count']>99 ? '99+' : data['count'];
			            break;
			          case '0':
			            _obj.classList.add('nc-icon-outline');
			          	_obj.classList.add('action-unlike');
			          	_obj.classList.remove('nc-icon-glyph');
			          	_obj.classList.remove('action-like');
			            _obj.previousElementSibling.innerHTML = data['count']>99 ? '99+' : data['count'];
			            break;
			          default: '';
			        }
				},'json'
			);

			
		}); 

		function videoCommentListCb(_a) {
			var b='',_deep='',_adminAction='',_like='',_author,_content,_head,_time;
			if (_a['data'].length) {
				for (c = 0; c < _a['data'].length; c++) {
					_head = "background-image: url('" + _a['data'][c].head + "');";
					_deep = _a['data'][c].pid != 0? 'deep' : '';
					if (1<=_a['gid'] && _a['gid'] <=5 && _a['gid']!=0) {
					_adminAction = '<a class="comment-delete" data-cid="' +_a['data'][c].cid+'" data-vid="'+_a['data'][c].vid+'">删除</a><a class="add-comment-reply" data-uid="{$uid}" data-pid="' +_a['data'][c].cid+'" data-vid="'+_a['data'][c].vid+'">回复&nbsp;</a>';
					}
					//var date = new Date();      
					_time = getLocalTime(_a['data'][c].time);
					//_time = _time.Format("yyyy/MM/dd");
					_like = _a['data'][c].vote == '1' ? 'nc-icon-glyph action-like' : 'nc-icon-outline action-unlike';
					_author = _a['data'][c].pauthor == null ?_a['data'][c].author : _a['data'][c].author + '<span class="black"> 回复 </span>' + _a['data'][c].pauthor;
				
					b+='<div class="ic-card-content '+_deep+'"> <div class="img-user" style="'+_head+'"></div><div class="ic-comment-wrapper">'+_adminAction+' <span class="comment-like"><em class="like-count">'+_a['data'][c].agree+'</em><i class="agree '+_like+' ui-3_heart" data-uid="'+_a['data'][c].uid+'" data-cid="'+_a['data'][c].cid+'" data-vote="1" ></i></span><p class="comment-title">'+_author+'</p><p class="comment-time">'+_time+'</p><p class="comment-content">'+_a['data'][c].content+'</p></div></div>';
				}
				console.log(b);
				document.querySelector('.empty-container').style.display = 'none';
				document.getElementById("ic-course-comment-list").style.display = '';
				document.getElementById("ic-course-comment-list").innerHTML=b;
			}else{
				document.getElementById("ic-course-comment-list").style.display = 'none';
				document.querySelector('.empty-container').style.display = '';
				document.getElementById("ic-course-comment-list").innerHTML=b;
			}
		}