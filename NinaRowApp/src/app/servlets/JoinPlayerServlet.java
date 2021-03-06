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

@WebServlet(name = "JoinPlayerServlet", urlPatterns = {"/joinPlayer"})
public class JoinPlayerServlet extends HttpServlet {

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
        String usernameFromSession = SessionUtils.getUsername(request);
        GameManager gameManager = ServletUtils.getGameManager(getServletContext());
        if (usernameFromSession == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("Player is not logged in");
        }
        else{
            String gameTitleFromParameter = request.getParameter(Constants.GAME_TITLE);
            synchronized (this) {
                if (!gameManager.isGameExists(gameTitleFromParameter)) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().println("Game does not exist");
                } else {
                    GameDescriptor game = gameManager.getGame(gameTitleFromParameter);
                    if(game.isGameFull()){
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Game has reached its total players amount");
                    }
                    else if(game.isActive()){
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Player can't join to a game that's already active");
                    }
                    else{
                        PlayerManager playerManager = ServletUtils.getPlayerManager(getServletContext());
                        Player player = playerManager.getPlayer(usernameFromSession);
                        if(game.isPlayerInGame(player)){
                            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                            response.getWriter().println("Player is already in the game");
                        }
                        else{
                            String typeFromSession = SessionUtils.getUserType(request);
                            if(typeFromSession.equals("Computer") && !game.isComputerAllowedToJoin()){
                                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                                response.getWriter().println("Game will not be played with computer players only");
                            }
                            else{
                                if(game.getDynamicPlayers().getPlayers().size() == 0
                                        && game.getDynamicPlayers().getVisitors().size() == 0) {
                                    try {
                                        game.init();
                                    } catch (Exception e) {
                                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                                        response.getWriter().println(e.getMessage());
                                    }
                                }
                                game.addPlayer(player);
                                player.init();
                                request.getSession(true).setAttribute(Constants.GAME_TITLE, gameTitleFromParameter);
                                response.setStatus(HttpServletResponse.SC_OK);
                            }
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
