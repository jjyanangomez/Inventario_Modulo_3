package com.krakedev.inventarios.persistencia;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;

import com.krakedev.inventarios.entidades.DetallePedido;
import com.krakedev.inventarios.entidades.Pedido;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBdd;

public class PedidosBDD {
	public void insertar(Pedido p) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		PreparedStatement psAux = null;
		ResultSet rsClave = null;
		int codigoCabecera = 0;
		
		Date fechaActual = new Date();
		java.sql.Date fechaSql = new java.sql.Date(fechaActual.getTime());
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("INSERT INTO cabecera_pedidos (proveedor,fecha,estado) "
					+ "VALUES (?,?,?);",Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, p.getProveedor().getIdentificador());
			ps.setDate(2, fechaSql);
			ps.setString(3, "S");
			
			ps.executeUpdate();
			
			rsClave=ps.getGeneratedKeys();
			if (rsClave.next()) {
				codigoCabecera = rsClave.getInt(1);
			}
			//System.out.println("Codigo generado: "+codigoCabecera);
			
			ArrayList<DetallePedido> ListDetalle = p.getDetalles();
			DetallePedido dp= null;
			for (int i = 0; i < ListDetalle.size(); i++) {
				dp = ListDetalle.get(i);
				psAux = con.prepareStatement("INSERT INTO detalle_pedido (cabecera_pedido,producto,cantidad,subtotal,cantidad_recibida) "
						+ "VALUES (?,?,?,?,?);");
				psAux.setInt(1, codigoCabecera);
				psAux.setInt(2, dp.getProducto().getCodigo());
				psAux.setInt(3, dp.getCantidad());
				BigDecimal pv= dp.getProducto().getPrecioVenta();
				BigDecimal cantidadSolicitada = new BigDecimal(dp.getCantidad());
				BigDecimal resul = pv.multiply(cantidadSolicitada);
				psAux.setBigDecimal(4, resul);
				psAux.setInt(5, 0);
				
				psAux.executeUpdate();
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al insertar el pedido: "+e.getMessage());
		}
	}
	public void actualizar(Pedido p) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		PreparedStatement psAux = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("UPDATE cabecera_pedidos SET "
					+ "estado = ? WHERE numero_pedido =?;");
			ps.setString(1, "R");
			ps.setInt(2,p.getNumeroPedido());
			
			ps.executeUpdate();
			
			ArrayList<DetallePedido> ListDetalle = p.getDetalles();
			DetallePedido dp= null;
			for (int i = 0; i < ListDetalle.size(); i++) {
				dp = ListDetalle.get(i);
				psAux = con.prepareStatement("UPDATE detalle_pedido "
						+ "SET cantidad_recibida=?, subtotal=? "
						+ "WHERE codigo=?;");
				psAux.setInt(1, dp.getCantidadRecibida());
				BigDecimal pv= dp.getProducto().getPrecioVenta();
				BigDecimal cantidadRecibida = new BigDecimal(dp.getCantidadRecibida());
				BigDecimal resul = pv.multiply(cantidadRecibida);
				psAux.setBigDecimal(2, resul);
				psAux.setInt(3, dp.getCodigo());
				
				psAux.executeUpdate();
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al insertar el pedido: "+e.getMessage());
		}
	}
}
