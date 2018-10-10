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

@WebServlet(name = "PushInServlet", urlPatterns = {"/pushIn"})
public class PushInServlet extends HttpServlet {

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
            synchronized (this) {
                String columnFromParameter = request.getParameter(Constants.COLUMN);
                String gameTitleFromSession = SessionUtils.getGameTitle(request);
                GameDescriptor game = gameManager.getGame(gameTitleFromSession);
                if (columnFromParameter == null ||
                        (Integer.parseInt(columnFromParameter)<game.getGame().getBoard().getRows()
                        && Integer.parseInt(columnFromParameter)>game.getGame().getBoard().getColumns().intValue())){
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().println("Column number is illegal");
                }
                else{
                    int column = Integer.parseInt(columnFromParameter);
                    Player activePlayer = game.getDynamicPlayers().getActivePlayer();
                    if(!activePlayer.getName().equals(usernameFromSession)){
                        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        response.getWriter().println("Player cant play when its not his turn");
                    }
                    else{
                        if(!game.isPushInAllowed(activePlayer, column)){
                            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                            response.getWriter().println("PushIn is not allowed in this column");
                        }
                        else{
                            game.pushIn(column);
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
