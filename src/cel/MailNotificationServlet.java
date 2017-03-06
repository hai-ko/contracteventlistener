package cel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;


@SuppressWarnings("serial")
public class MailNotificationServlet extends HttpServlet { 
	 private static final Logger log = Logger.getLogger(MailNotificationServlet.class.getName());
	
	public static String requestToString(HttpServletRequest request) {
		StringBuffer jb = new StringBuffer();
		  String line = null;
		  try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		  } catch (Exception e) {
			  log.severe(e.getMessage());
		  }
		  return jb.toString();
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		String answer = "Registration successful";
		String requestData = requestToString(request);
		
		try {
			JSONObject jsonObject = new JSONObject(requestData);
		    //JSONObject jsonObject =  HTTP.toJSONObject(requestData);
		    
		    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

			Entity registration = new Entity("Registration");
			registration.setProperty("mailAddress", jsonObject.getString("mailAddress"));
			registration.setProperty("highestBlock", jsonObject.getString("highestBlock"));
			registration.setProperty("abi", new Text(jsonObject.getString("abi")));
			registration.setProperty("selectedEventID", jsonObject.getString("selectedEventID"));
			registration.setProperty("contractAddress", jsonObject.getString("contractAddress"));

			datastore.put(registration);
		    
		    
		  } catch (JSONException e) {
			  response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			  log.severe(e.getMessage());
		    
		  }
		
		try {
			response.getWriter().print(answer);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.severe(e.getMessage());
		}
	}
}
