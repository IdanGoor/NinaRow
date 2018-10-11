package app.servlets;

import Logic.GameDescriptor;
import Logic.GameManager;
import Logic.Player;
import Logic.PlayerManager;
import app.constants.Constants;
import app.utils.ServletUtils;
import app.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "LeaveGameServlet", urlPatterns = {"/leaveGame"})
public class LeaveGameServlet extends HttpServlet {

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
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("Player is not logged in");
        } else {
            synchronized (this) {
                if (!playerManager.isPlayerExists(usernameFromSession)) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().println("Player does not exists");
                } else {
                    Player player = playerManager.getPlayer(usernameFromSession);
                    String gameTitleFromSession = SessionUtils.getGameTitle(request);
                    if(gameTitleFromSession == null){
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Player didn't join any game");
                    }
                    else{
                        String playerTypeFromSession = SessionUtils.getUserType(request);
                        GameManager gameManager = ServletUtils.getGameManager(getServletContext());
                        GameDescriptor game = gameManager.getGame(gameTitleFromSession);
                        if(playerTypeFromSession.equals("Computer") && game.isPlaying(player) && game.isActive()){
                            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                            response.getWriter().println("Computer player cannot leave game");
                        }
                        else{
                            request.getSession(false).removeAttribute(Constants.GAME_TITLE);
                            game.removePlayer(player);
                        }
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
