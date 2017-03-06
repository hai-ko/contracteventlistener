package cel;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Query;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.KeyFactory;


@SuppressWarnings("serial")
public class EventWatcherServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(EventWatcherServlet.class.getName());
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("Registration");
		List<Entity> results = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
		for(Entity entity : results) {
			if(!entity.getProperty("mailAddress").toString().equals("none")) {
				generateEtherscanRequest(entity, datastore);
		
			}
		}
		
	}
	
	
	public void generateEtherscanRequest(Entity entity, DatastoreService ds) {
		String urlString = "https://api.etherscan.io/api?module=logs&action=getLogs"
		+ "&fromBlock=" +  entity.getProperty("highestBlock").toString()
		+ "&toBlock=latest"
		+ "&address=" + entity.getProperty("contractAddress").toString()
		+ "&topic0=" + "0x" + entity.getProperty("selectedEventID").toString();
		
		URL url;
		try {
			url = new URL(urlString);
		
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setConnectTimeout(15000);
			conn.setRequestMethod("GET");
			
			String result = streamToString(conn.getInputStream());
			
			JSONObject jsonObject = new JSONObject(result);
			if(jsonObject.getJSONArray("result").length() != 0) {
				
				sendMail("Registration", "http://1-dot-contracteventlistener.appspot.com?watchID=" + KeyFactory.keyToString(entity.getKey()), entity.getProperty("mailAddress").toString());
			
				entity.setProperty("mailAddress", "none");
				ds.put(entity);
			}
			
			
		} catch (MessagingException | IOException | JSONException e) {
			log.severe(e.getMessage());
		}
	
		
	}
	
	public void sendMail(String subject, String text, String to) throws UnsupportedEncodingException, MessagingException {
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		Message msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress("noreply@contracteventlistener.appspotmail.com", "Admin"));
		msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to, ""));
		msg.setSubject(subject);
		msg.setText(text);
		Transport.send(msg);
		
		
	}
	
	public static String streamToString(java.io.InputStream is) {
	    java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
	    return s.hasNext() ? s.next() : "";
	}

}
