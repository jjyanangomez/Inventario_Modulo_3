package com.krakedev.inventarios.persistencia;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;


import com.krakedev.inventarios.entidades.DetalleVenta;
import com.krakedev.inventarios.entidades.Venta;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBdd;

public class VentasBDD {
	public void insertar(Venta v) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		PreparedStatement psAux = null;
		PreparedStatement psCab = null;
		PreparedStatement psHis = null;
		ResultSet rsClave = null;
		
		int codigoCabecera = 0;
		BigDecimal TotalSinIva = BigDecimal.ZERO;
		BigDecimal TotalIva = BigDecimal.ZERO;
		BigDecimal Total = BigDecimal.ZERO;
		
		Date fechaActual = new Date();
		Timestamp fechaHoraActual = new Timestamp(fechaActual.getTime());
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("INSERT INTO cabecera_ventas (fecha_venta,total_sin_iva,iva,total) "
					+ "VALUES (?,?,?,?);",Statement.RETURN_GENERATED_KEYS);
			ps.setTimestamp(1, fechaHoraActual);
			ps.setBigDecimal(2, new BigDecimal(0));
			ps.setBigDecimal(3, new BigDecimal(0));
			ps.setBigDecimal(4, new BigDecimal(0));
			
			ps.executeUpdate();
			
			rsClave=ps.getGeneratedKeys();
			if (rsClave.next()) {
				codigoCabecera = rsClave.getInt(1);
			}
			//System.out.println("Codigo generado: "+codigoCabecera);
			
			ArrayList<DetalleVenta> ListDetalle = v.getDetalles();
			DetalleVenta dv= null;
			for (int i = 0; i < ListDetalle.size(); i++) {
				dv = ListDetalle.get(i);
				psAux = con.prepareStatement("INSERT INTO detalle_ventas (cabecera_venta,producto,cantidad,precio_venta,subtotal,subtotal_iva)"
						+ " VALUES (?,?,?,?,?,?);");
				psAux.setInt(1, codigoCabecera);
				psAux.setInt(2, dv.getProducto().getCodigo());
				psAux.setInt(3, dv.getCantidad());
				
				BigDecimal pv= dv.getProducto().getPrecioVenta();
				psAux.setBigDecimal(4, pv);
				
				BigDecimal cantidad = new BigDecimal(dv.getCantidad());
				BigDecimal resulSubTotal = pv.multiply(cantidad);
				psAux.setBigDecimal(5, resulSubTotal);
				
				if(dv.getProducto().isTieneIva()) {
					BigDecimal iva = new BigDecimal(1.12);
					BigDecimal resulSubTotalIva = resulSubTotal.multiply(iva);
					psAux.setBigDecimal(6, resulSubTotalIva);
					TotalIva = TotalIva.add(resulSubTotalIva);
				}else {
					psAux.setBigDecimal(6, resulSubTotal);
					TotalSinIva = TotalIva.add(resulSubTotal);;
				}		
				psAux.executeUpdate();
				
				/*
				 * 
				 * /////////////////////////// Guardar en el historial //////////////////////////////////
				 * 
				 */
				
				psHis = con.prepareStatement("INSERT INTO historial (fecha,referencia,producto,cantidad) "
						+ "VALUES (?,?,?,?);");
				psHis.setTimestamp(1, fechaHoraActual);
				psHis.setString(2, "Venta "+codigoCabecera);
				psHis.setInt(3, dv.getProducto().getCodigo());
				psHis.setInt(4, 1*-(dv.getCantidad()));
				
				psHis.executeUpdate();
				
			}
			
			/*
			 * 
			 * /////////////////////////// Actualizar cabeceraPedido //////////////////////////////////
			 * 
			 */
			psCab = con.prepareStatement("UPDATE cabecera_ventas "
					+ "SET total_sin_iva = ?,iva = ?,total = ? "
					+ " WHERE codigo=?");
			psCab.setBigDecimal(1, TotalSinIva);
			psCab.setBigDecimal(2, TotalIva);
			Total = TotalIva.add(TotalSinIva);
			psCab.setBigDecimal(3, Total);
			psCab.setInt(4, codigoCabecera);
			psCab.executeUpdate();
			
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al realizar el proceso de registro de venta. Detalle: "+e.getMessage());
		}
	}
}
