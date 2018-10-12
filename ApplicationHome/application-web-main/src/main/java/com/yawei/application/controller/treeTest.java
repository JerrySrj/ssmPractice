package com.yawei.application.controller;

public class treeTest {
	
	
	
	/*public List<XwManaSy> getTreeList(List<XwManaSy> xwList) {
		String parCode = "";
		String xmCode=""; 
		List<XwManaSy> finalList = new ArrayList<XwManaSy>(); 
		if (!CollectionUtils.isEmpty(xwList)) {
			for (XwManaSy str : xwList) {
				//父节点编码
				parCode = str.getCpar_code();
				//节点编码
				xmCode= str.getXmCode(); 
				if(parCode.equals("")||parCode==null){
					finalList.add(str);
				}else{
					for (XwManaSy chilstr : xwList) {
						//如果相等则为子节点
						if (parCode.equals(chilstr.getXmCode())) {  
								if (chilstr.getChildren()== null) {
									chilstr.setChildren(new ArrayList<XwManaSy>());
								}
								chilstr.getChildren().add(str);  
						}  
					} 
				}
			}
		}
		return finalList;
	}*/
}
