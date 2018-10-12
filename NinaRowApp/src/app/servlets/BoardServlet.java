package app.servlets;

import Logic.*;
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
import java.math.BigInteger;
import java.util.LinkedList;
import java.util.List;

@WebServlet(name = "BoardServlet", urlPatterns = {"/board"})
public class BoardServlet extends HttpServlet {

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
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        String gameTitleFromSession = SessionUtils.getGameTitle(request);
        if (gameTitleFromSession == null) {
            response.getWriter().println("Player didn't join any game");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        else{
            try (PrintWriter out = response.getWriter()) {
                Gson gson = new Gson();
                GameManager gameManager = ServletUtils.getGameManager(getServletContext());
                GameDescriptor game = gameManager.getGame(gameTitleFromSession);
                String json = gson.toJson(new BoardState(game));
                out.println(json);
                out.flush();
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

    class BoardState {
        final private List<Column> discsColumns = new LinkedList<>();
        final private String variant;
        final private int rows;
        final private BigInteger columns;
        final private String status;
        final private boolean isEnded;
        private Player activePlayer = null;

        public BoardState(GameDescriptor game) {
            Board board = game.getGame().getBoard();
            Disc[][] discs = board.getDiscs();

            this.variant = game.getGame().getVariant();
            this.rows = board.getRows();
            this.columns = board.getColumns();
            if(!game.getDynamicPlayers().getPlayers().isEmpty())
                this.activePlayer = game.getDynamicPlayers().getActivePlayer();
            this.status = game.getStatus();
            this.isEnded = game.isEnded();

            for(int col=0; col < board.getColumns().intValue(); col++){
                this.discsColumns.add(new Column(col ,discs, board.getRows()));
            }
        }

        class Column{
            final private int index;
            final private List<Disc> discs = new LinkedList<>();
            final private boolean isFull;
            final private boolean isEmpty;

            public Column(int index, Disc[][] discs, int rows){
                this.index = index;
                for(int row=0; row < rows; row++){
                    this.discs.add(discs[row][index]);
                }
                this.isFull = (discs[rows-1][index] != null);
                this.isEmpty = (discs[0][index] == null);
            }
        }
    }
}
