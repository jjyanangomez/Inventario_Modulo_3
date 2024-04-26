package com.krakedev.inventarios.persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.krakedev.inventarios.entidades.Proveedor;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBdd;


public class ProveedoresBDD {

	public ArrayList<Proveedor> buscar(String subCadena) throws KrakeDevException{
		ArrayList<Proveedor> ListProveedores = new ArrayList<Proveedor>();
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs= null;
		Proveedor p = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select * from proveedores Where upper(nombre) like ?;");
			ps.setString(1, "%"+subCadena.toUpperCase()+"%");
			rs = ps.executeQuery();
			while (rs.next()) {
				String identificador = rs.getString("identificador");
				String tipoDocumento = rs.getString("tipo_documento");
				String nombre = rs.getString("nombre");
				String telefono = rs.getString("telefono");
				String correo = rs.getString("correo");
				String direccion = rs.getString("direccion");
				p = new Proveedor(identificador, tipoDocumento, nombre, telefono, correo, direccion);
				ListProveedores.add(p);
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
		return ListProveedores;
	}
}
