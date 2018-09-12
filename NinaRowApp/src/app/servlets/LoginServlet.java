package app.servlets;

import Logic.PlayerManager;
import app.constants.Constants;
import app.utils.ServletUtils;
import app.utils.SessionUtils;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String usernameFromSession = SessionUtils.getUsername(request);
        PlayerManager playerManager = ServletUtils.getPlayerManager(getServletContext());
        if (usernameFromSession == null) {
            //user is not logged in yet
            String playerNameFromParameter = request.getParameter(Constants.PLAYER_NAME);
            String playerTypeFromParameter = request.getParameter(Constants.PLAYER_TYPE);
            if (playerNameFromParameter == null) {
                //no username in session and no username in parameter -
                //redirect back to the index page
                //this return an HTTP code back to the browser telling it to load
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            } else {
                //normalize the username value
                playerNameFromParameter = playerNameFromParameter.trim();
                synchronized (this) {
                    if (playerManager.isPlayerExists(playerNameFromParameter)) {
                        String errorMessage = "Username " + playerNameFromParameter + " already exists. Please enter a different username.";
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        request.setAttribute(Constants.PLAYER_NAME_ERROR, errorMessage);
                    } else {
                        //add the new user to the users list
                        playerManager.addPlayer(playerNameFromParameter, playerTypeFromParameter);
                        //set the username in a session so it will be available on each request
                        //the true parameter means that if a session object does not exists yet
                        //create a new one
                        request.getSession(true).setAttribute(Constants.PLAYER_NAME, playerNameFromParameter);
                        request.getSession(true).setAttribute(Constants.PLAYER_TYPE, playerTypeFromParameter);

                        System.out.println("On login, request URI is: " + request.getRequestURI());
                        response.setStatus(HttpServletResponse.SC_OK);
                    }
                }
            }
        }
    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    } // </editor-fold>
}
