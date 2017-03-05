package cel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@SuppressWarnings("serial")
public class MailNotificationServlet extends HttpServlet { 
	
	
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
	
	public static String requestToString(HttpServletRequest request) {
		StringBuffer jb = new StringBuffer();
		  String line = null;
		  try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		  } catch (Exception e) {
			  e.printStackTrace();
		  }
		  return jb.toString();
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		
		
		
			try {
				sendMail("Registration", requestToString(request), "mmhr@gmx.de");
			} catch (UnsupportedEncodingException | MessagingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	
		/*DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

		Entity employee = new Entity("Registration", "ttttt");
		employee.setProperty("firstName", "tttt");

		datastore.put(employee);*/
		
		try {
			response.getWriter().print("Registration for Event: OK");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		

	}
}
