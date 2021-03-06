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

@WebServlet(name = "DeleteGameServlet", urlPatterns = {"/deleteGame"})
public class DeleteGameServlet extends HttpServlet {

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
                    PlayerManager playerManager = ServletUtils.getPlayerManager(getServletContext());
                    Player player = playerManager.getPlayer(usernameFromSession);
                    if(game.getDynamicPlayers().getPlayers().size() > 0 ||
                            game.getDynamicPlayers().getVisitors().size() > 0){
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Cannot delete game while there are players/visitors in it");
                    }
                    else{
                        if(!game.getCreator().getName().equals(usernameFromSession)){
                            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                            response.getWriter().println("Only the game's creator can delete the game");
                        }
                        else{
                            gameManager.removeGame(game);
                            response.setStatus(HttpServletResponse.SC_OK);
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
