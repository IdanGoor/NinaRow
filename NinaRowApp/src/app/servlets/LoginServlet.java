package app.servlets;

import Logic.GameDescriptor;
import Logic.GameManager;
import Logic.PlayerManager;
import app.constants.Constants;
import app.utils.GameInfo;
import app.utils.ServletUtils;
import app.utils.SessionUtils;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {

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
        String usernameFromSession = SessionUtils.getUsername(request);
        if (usernameFromSession == null) {
            response.getWriter().println("Player is not logged in");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        else{
            String userTypeFromSession = SessionUtils.getUserType(request);
            User user = new User(usernameFromSession, userTypeFromSession);
            try (PrintWriter out = response.getWriter()) {
                Gson gson = new Gson();
                String json = gson.toJson(user);
                out.println(json);
                out.flush();
            }
        }
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
        response.setContentType("text/html;charset=UTF-8");
        String usernameFromSession = SessionUtils.getUsername(request);
        PlayerManager playerManager = ServletUtils.getPlayerManager(getServletContext());
        if (usernameFromSession == null) {
            String playerNameFromParameter = request.getParameter(Constants.PLAYER_NAME);
            String playerTypeFromParameter = request.getParameter(Constants.PLAYER_TYPE);
            if (playerNameFromParameter == null) {
            } else {
                playerNameFromParameter = playerNameFromParameter.trim();
                synchronized (this) {
                    if (playerManager.isPlayerExists(playerNameFromParameter)) {
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Username " + playerNameFromParameter + " already exists");
                    } else {
                        playerManager.addPlayer(playerNameFromParameter, playerTypeFromParameter);
                        request.getSession(true).setAttribute(Constants.PLAYER_NAME, playerNameFromParameter);
                        request.getSession(true).setAttribute(Constants.PLAYER_TYPE, playerTypeFromParameter);
                        response.setStatus(HttpServletResponse.SC_CREATED);
                    }
                }
            }
        }
    }

    class User{
        final private String name;
        final private String type;
        User(String name, String type){
            this.name = name;
            this.type = type;
        }
    }
}
