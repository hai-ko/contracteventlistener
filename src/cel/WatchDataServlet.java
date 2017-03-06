package cel;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;

@SuppressWarnings("serial")
public class WatchDataServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(WatchDataServlet.class.getName());
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
		Entity entity;
		try {
			entity = datastore.get(KeyFactory.stringToKey(req.getParameter("watchID")));
		
			String responseJSON = "{ \"highestBlock\": "
					+ "\""+entity.getProperty("highestBlock").toString()
					+ "\", \"contractAddress\": \""
					+ entity.getProperty("contractAddress").toString()
					+ "\", \"selectedEventID\": \""
				    + entity.getProperty("selectedEventID").toString()
					+ "\", \"abi\":"
					+ ((Text) entity.getProperty("abi")).getValue()
					+ "}";
			resp.setContentType("text/plain");
			resp.getOutputStream().write(responseJSON.getBytes());
				
		} catch (EntityNotFoundException e) {
			// TODO Auto-generated catch block
			log.severe(e.getMessage());	
		}
	}

}
