package com.sunrj.application.controller;

import java.io.File;

public class del {
public static void deleteFiles( File file ){
        
        if( file.isDirectory() ){
            // 如果是一个目录, 先查找这个目录下面的所有文件或目录
            // 再根据情况删除
            File[] files = file.listFiles();
            if( files.length == 0 ){
                //如果是一个空目录,直接删除
                file.delete();
            } else {
                // 如果不是空目录, 则递归
                for( File f : files ){
                    deleteFiles(f);
                    f.getParentFile().delete();
                }
            }
        } else {
            // 如果是一个文件,直接进行删除
            file.delete();
        }
    }

	public static void main(String[] args) {
		File file = new File("E:\\GitRepository\\ApplicationHome\\ApplicationHome\\out");
		deleteFiles(file);
	}
}
