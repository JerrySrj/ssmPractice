function select(num){
	$("#lk_metadatatype").val(num);
	search();
}
function research(rowIndex){
	if(rowIndex==0){
		$("#lk_metadatatype").val("");
		search();
	}
}