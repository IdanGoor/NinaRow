package app.servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(name = "GameListServlet", urlPatterns = {"/gamelist"})
public class GameListServlet extends HttpServlet {
}
