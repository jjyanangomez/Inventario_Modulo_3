package com.krakedev.inventarios.persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.krakedev.inventarios.entidades.Proveedor;
import com.krakedev.inventarios.entidades.TipoDocumento;
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
			ps = con.prepareStatement("select pro.identificador,pro.tipo_documento,td.descripcion,pro.nombre,pro.telefono,pro.correo,pro.direccion from proveedores pro, tipo_documento td "
					+ "Where pro.tipo_documento = td.codigo_doc AND "
					+ "upper(nombre) like ?;");
			ps.setString(1, "%"+subCadena.toUpperCase()+"%");
			rs = ps.executeQuery();
			while (rs.next()) {
				String identificador = rs.getString("identificador");
				String codigoTipoDocumento = rs.getString("tipo_documento");
				String descripcionTd = rs.getString("descripcion");
				String nombre = rs.getString("nombre");
				String telefono = rs.getString("telefono");
				String correo = rs.getString("correo");
				String direccion = rs.getString("direccion");
				TipoDocumento tp= new TipoDocumento(codigoTipoDocumento,descripcionTd); 
				p = new Proveedor(identificador, tp, nombre, telefono, correo, direccion);
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
	
	public void insertar(Proveedor p) throws KrakeDevException{
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("INSERT INTO proveedores (identificador,tipo_documento,nombre,telefono,correo,direccion) "
					+ "VALUES (?,?,?,?,?,?);");
			ps.setString(1, p.getIdentificador());
			ps.setString(2, p.getTipoDocumento().getCodigoDoc());
			ps.setString(3, p.getNombre());
			ps.setString(4, p.getTelefono());
			ps.setString(5, p.getCorreo());
			ps.setString(6, p.getDireccion());
			ps.executeUpdate();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al insertar el proveedor: "+e.getMessage());
		}
	}
	public Proveedor buscarPorIdentificador(String cadena) throws KrakeDevException{
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs= null;
		Proveedor p = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select pro.identificador,pro.tipo_documento,td.descripcion,pro.nombre,pro.telefono,pro.correo,pro.direccion "
					+ "from proveedores pro, tipo_documento td "
					+ "Where pro.tipo_documento = td.codigo_doc AND "
					+ "identificador = ?;");
			ps.setString(1, cadena);
			rs = ps.executeQuery();
			if (rs.next()) {
				String identificador = rs.getString("identificador");
				String codigoTipoDocumento = rs.getString("tipo_documento");
				String descripcionTd = rs.getString("descripcion");
				String nombre = rs.getString("nombre");
				String telefono = rs.getString("telefono");
				String correo = rs.getString("correo");
				String direccion = rs.getString("direccion");
				TipoDocumento tp= new TipoDocumento(codigoTipoDocumento,descripcionTd); 
				p = new Proveedor(identificador, tp, nombre, telefono, correo, direccion);
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
		return p;
	}
}
