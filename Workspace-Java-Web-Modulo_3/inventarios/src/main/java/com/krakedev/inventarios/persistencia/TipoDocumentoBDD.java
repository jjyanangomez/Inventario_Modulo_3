package com.krakedev.inventarios.persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.krakedev.inventarios.entidades.TipoDocumento;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBdd;


public class TipoDocumentoBDD {

	public ArrayList<TipoDocumento> recuperar() throws KrakeDevException{
		ArrayList<TipoDocumento> ListTipoDocumento = new ArrayList<TipoDocumento>();
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs= null;
		TipoDocumento td = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select * from tipo_documento");
			rs = ps.executeQuery();
			while (rs.next()) {
				String codigo = rs.getString("codigo_doc");
				String descripcion = rs.getString("descripcion");
				td = new TipoDocumento(codigo, descripcion);
				ListTipoDocumento.add(td);
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
		return ListTipoDocumento;
	}
}
