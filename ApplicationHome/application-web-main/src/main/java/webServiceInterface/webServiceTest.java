package webServiceInterface;
 

import java.util.List;

import cn.com.webxml.ArrayOfString;
import cn.com.webxml.WeatherWebService;
import cn.com.webxml.WeatherWebServiceSoap;

public class webServiceTest {
	public static void main(String[] args) {
		WeatherWebService service = new WeatherWebService();
		WeatherWebServiceSoap soap = service.getWeatherWebServiceSoap();
		ArrayOfString weatherbyCityName = soap.getWeatherbyCityName("青岛"); 
		/*System.out.println(weatherbyCityName.getString());*/
		List<String> wealist=weatherbyCityName.getString();
		for(String param:wealist){  
			System.out.println(param);
		} 
	}
	 
}
