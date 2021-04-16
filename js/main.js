$(function(){
	if($('textarea#editor').length){
		CKEDITOR.replace('editor')
	}
})

if($("[data-fancybox]").length){
	$("[data-fancybox]").fancybox()
}