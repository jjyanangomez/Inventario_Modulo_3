package com.krakedev.inventarios.persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

import com.krakedev.inventarios.entidades.Categoria;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBdd;

public class CategoriaBDD {
	public void insertar(Categoria c) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("INSERT INTO categorias (nombre,categoria_padre) "
					+ "VALUES (?, ?);");
			ps.setString(1, c.getNombre());
			if(c.getCategoriaPadre()!=null) {
				ps.setInt(2, c.getCategoriaPadre().getCodigoCat());
			}else {
				ps.setNull(2, Types.INTEGER);
			}
			ps.executeUpdate();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al insertar la categoria. Detalle: "+e.getMessage());
		}
	}
	public void actualizar(Categoria c) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("UPDATE categorias SET nombre=?, categoria_padre=? "
					+ "WHERE codigo_cat=?;");
			ps.setString(1, c.getNombre());
			if(c.getCategoriaPadre()!=null) {
				ps.setInt(2, c.getCategoriaPadre().getCodigoCat());
			}else {
				ps.setNull(2, Types.INTEGER);
			}
			ps.setInt(3, c.getCodigoCat());
			ps.executeUpdate();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al actualizar la categoria. Detalle: "+e.getMessage());
		}
	}
	public ArrayList<Categoria> recuperarTodas() throws KrakeDevException{
		ArrayList<Categoria> ListCategorias = new ArrayList<Categoria>();
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs= null;
		Categoria c = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select  * from categorias");
			rs = ps.executeQuery();
			while (rs.next()) {
				int codigo = rs.getInt("codigo_cat");
				String nombre = rs.getString("nombre");
				Categoria cat = new Categoria();
				cat.setCodigoCat(rs.getInt("categoria_padre"));;
				c = new Categoria(codigo, nombre, cat);
				ListCategorias.add(c);
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
		return ListCategorias;
	}
}
