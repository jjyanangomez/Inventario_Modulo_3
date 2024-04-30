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

import com.krakedev.inventarios.entidades.Categoria;
import com.krakedev.inventarios.entidades.CategoriaUDM;
import com.krakedev.inventarios.entidades.DetallePedido;
import com.krakedev.inventarios.entidades.EstadoPedido;
import com.krakedev.inventarios.entidades.Pedido;
import com.krakedev.inventarios.entidades.Producto;
import com.krakedev.inventarios.entidades.Proveedor;
import com.krakedev.inventarios.entidades.TipoDocumento;
import com.krakedev.inventarios.entidades.UnidadDeMedida;
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
		PreparedStatement psHis = null;
		
		Date fechaActual = new Date();
		Timestamp fechaHoraActual = new Timestamp(fechaActual.getTime());
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("UPDATE cabecera_pedidos SET "
					+ "estado = ? WHERE numero_pedido =?;");
			ps.setString(1, "R");
			ps.setInt(2,p.getNumeroPedido());
			
			ps.executeUpdate();
			/*
			 * 
			 * /////////////////////////// Actualizar detalle del pedido //////////////////////////////////
			 * 
			 */
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
				/*
				 * 
				 * /////////////////////////// Guardar en el historial //////////////////////////////////
				 * 
				 */
				
				psHis = con.prepareStatement("INSERT INTO historial (fecha,referencia,producto,cantidad) "
						+ "VALUES (?,?,?,?);");
				psHis.setTimestamp(1, fechaHoraActual);
				psHis.setString(2, "Pedido"+p.getNumeroPedido());
				psHis.setInt(3, dp.getProducto().getCodigo());
				psHis.setInt(4, dp.getCantidadRecibida());
				
				psHis.executeUpdate();
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al insertar el pedido: "+e.getMessage());
		}
	}
	
	public ArrayList<Pedido> buscarPorProveedor(String identificador) throws KrakeDevException{
		ArrayList<Pedido> listPedidos = new ArrayList<Pedido>();
		Connection con = null;
		PreparedStatement ps = null;
		PreparedStatement psAux = null;
		ResultSet rs= null;
		ResultSet rsAux= null;
		Pedido p= null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select pro.identificador, pro.nombre, pro.telefono, pro.correo, pro.direccion, "
					+ "td.codigo_doc, td.descripcion AS descipcion_doc, "
					+ "cp.numero_pedido, cp.fecha, cp.estado, ep.descripcion AS descripcion_estado "
					+ "from proveedores pro,cabecera_pedidos cp, estado_pedido ep, tipo_documento td "
					+ "Where cp.proveedor = pro.identificador AND ep.codigo = cp.estado AND td.codigo_doc = pro.tipo_documento "
					+ "AND cp.proveedor =?;");
			ps.setString(1, identificador);
			rs = ps.executeQuery();
			while (rs.next()) {			
				String codigoDoc = rs.getString("codigo_doc");
				String descripcionDoc = rs.getString("descipcion_doc");
				TipoDocumento td = new TipoDocumento(codigoDoc,descripcionDoc);
				
				String nombre = rs.getString("nombre");
				String telefono = rs.getString("telefono");
				String correo = rs.getString("correo");
				String direccion = rs.getString("direccion");
				Proveedor pro = new Proveedor(identificador, td, nombre, telefono, correo, direccion);
				
				String codigoEstado = rs.getString("estado");
				String descripcionEstado = rs.getString("descripcion_estado");
				EstadoPedido ep = new EstadoPedido(codigoEstado,descripcionEstado);
				
				int codigo = rs.getInt("numero_pedido");
				Date fecha = rs.getDate("fecha");
				p = new Pedido(codigo, pro, fecha, ep);
				
				psAux = con.prepareStatement("select deta.codigo AS codigo_detalle , deta.cabecera_pedido, pro.codigo_producto, pro.nombre, "
						+ "udm.codigo_udm, udm.descripcion AS descripcion_udm, udm.categoria_udm, cast(pro.precio_venta as decimal(6,2)), "
						+ "pro.tiene_iva, cast(pro.coste as decimal(5,4)), pro.categoria, c.nombre As nombre_categoria, pro.stock, "
						+ "deta.cantidad As cantidad_solicitada,cast(deta.subtotal as decimal(10,4)),deta.cantidad_recibida "
						+ "from detalle_pedido deta, productos pro, categorias c, unidad_medida udm "
						+ "Where deta.producto = pro.codigo_producto AND pro.categoria = c.codigo_cat AND pro.udm = udm.codigo_udm "
						+ "AND deta.cabecera_pedido=?;");
				psAux.setInt(1, codigo);
				rsAux = psAux.executeQuery();
				ArrayList<DetallePedido> listDetalle = new ArrayList<DetallePedido>();
				while(rsAux.next()) {
					String codigoUdm = rsAux.getString("codigo_udm");
					String descripcion = rsAux.getString("descripcion_udm");
					CategoriaUDM categoriaUdm = new CategoriaUDM(rsAux.getString("categoria_udm"), null);
					UnidadDeMedida udm = new UnidadDeMedida(codigoUdm, descripcion, categoriaUdm);
					
					int codigoCat = rsAux.getInt("categoria");
					String nombreCategoria = rsAux.getString("nombre_categoria");
					Categoria cate = new Categoria(codigoCat, nombreCategoria, null);
					
					int codigoProducto = rsAux.getInt("codigo_producto");
					String nombreProducto = rsAux.getString("nombre");
					BigDecimal precioVenta = rsAux.getBigDecimal("precio_venta");
					boolean tieneIva = rsAux.getBoolean("tiene_iva");
					BigDecimal coste = rsAux.getBigDecimal("coste");;
					int stock = rsAux.getInt("stock");
					Producto producto = new Producto(codigoProducto, nombreProducto, udm, precioVenta, tieneIva, coste, cate, stock);
					
					int codigoDetalle = rsAux.getInt("codigo_detalle");
					int cantidadSolicitada = rsAux.getInt("cantidad_solicitada");
					BigDecimal Subtotal = rsAux.getBigDecimal("subtotal");
					int cantidadRecibida = rsAux.getInt("cantidad_recibida");
					DetallePedido  detalle = new DetallePedido(codigoDetalle, null, producto, cantidadSolicitada, Subtotal, cantidadRecibida);
					listDetalle.add(detalle);
					
				}
				p.setDetalles(listDetalle);
				listPedidos.add(p);
			}
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
		return listPedidos;
	}
}
