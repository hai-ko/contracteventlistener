package cel;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.*;

@SuppressWarnings("serial")
public class EtherscanProxyServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String urlString = "https://api.etherscan.io/api?module=logs&action=getLogs";
		urlString += checkAndCopyParameter("fromBlock",req);
		urlString += checkAndCopyParameter("toBlock",req);
		urlString += checkAndCopyParameter("address",req);
		urlString += checkAndCopyParameter("topic0",req);
		urlString += "&topic0_1_opr=or";
		urlString += "&topic0_2_opr=or";
		
		urlString += checkAndCopyParameter("topic1",req);
		urlString += "&topic1_2_opr=or";
		
		urlString += checkAndCopyParameter("topic2",req);
		
		urlString += checkAndCopyParameter("topic3",req);
		
		
		URL url = new URL(urlString);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setConnectTimeout(15000);
		conn.setRequestMethod("GET");
		
		resp.setContentType("text/plain");
		resp.setContentLength(conn.getContentLength());
	
		EtherscanProxyServlet.streamInputToOutput(conn.getInputStream(), resp.getOutputStream());
		
		
	}
	
	public static String checkAndCopyParameter(String parameterName, HttpServletRequest req) {
		if(req.getParameter(parameterName) != null && !req.getParameter(parameterName).equals("")) {
			return "&" + parameterName + "=" + req.getParameter(parameterName); 
		} else {
			return "";
		}
	}
	
	public static void streamInputToOutput(InputStream in, OutputStream out) {
		byte[] buffer = new byte[10240];

		try {
		    for (int length = 0; (length = in.read(buffer)) > 0;) {
		        out.write(buffer, 0, length);
		    }
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
}
