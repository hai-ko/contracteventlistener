package cel;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;


@SuppressWarnings("serial")
public class EventWatcherServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(MailNotificationServlet.class.getName());
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("Registration");
		List<Entity> results = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
		for(Entity entity : results) {
			log.severe("minute is over!" + entity.getProperty("mailAddress").toString());
		}
		
		
	}
	
	/*public void generateEtherscanRequest(String fromBlock, String address) {
		String urlString = "https://api.etherscan.io/api?module=logs&action=getLogs"
		+ "&fromBlock=" +  fromBlock
		+ "&toBlock=latest"
		+ += checkAndCopyParameter("address",address);
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
	}*/

}
