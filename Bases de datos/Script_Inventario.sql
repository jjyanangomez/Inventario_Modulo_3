drop table if exists detalle_ventas;
drop table if exists cabecera_ventas;
drop table if exists historial;
drop table if exists detalle_pedido;
drop table if exists cabecera_pedidos;
drop table if exists estado_pedido;
drop table if exists proveedores;
drop table if exists tipo_documento;
drop table if exists productos;
drop table if exists unidad_medida;
drop table if exists categoria_unidad_medida;
drop table if exists categorias;

create table categorias(
	codigo_cat serial not null,
	nombre varchar(100) not null,
	categoria_padre int,
	constraint categoria_pk primary key (codigo_cat),
	constraint categoria_fk_codigo foreign key(categoria_padre)
	references categorias(codigo_cat)
);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Materia Prima', null);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Proteina', 1);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Salsas', 1);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Punto de Venta', null);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Bebidas', 4);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Con alcohol', 5);
INSERT INTO categorias (nombre,categoria_padre) VALUES ('Sin Alcohol', 5);

select * from categorias;

---Tabla Categoria unidad de medida
create table categoria_unidad_medida(
	codigo_udm char(1) not null,
	nombre varchar(100) not null,
	constraint categoria_unidad_medida_PK PRIMARY KEY(codigo_udm)
);
INSERT INTO categoria_unidad_medida (codigo_udm,nombre) VALUES ('U', 'Unidades');
INSERT INTO categoria_unidad_medida (codigo_udm,nombre) VALUES ('V', 'Volumen');
INSERT INTO categoria_unidad_medida (codigo_udm,nombre) VALUES ('P', 'Peso');
INSERT INTO categoria_unidad_medida (codigo_udm,nombre) VALUES ('L', 'Longitud');

select * from categoria_unidad_medida;

---Tabla Unidad de medidas
create table unidad_medida(
	codigo_udm char(2) not null,
	descripcion varchar(100) not null,
	categoria_udm char(1) not null,
	constraint unidad_medida_PK PRIMARY KEY(codigo_udm),
	constraint unidad_medida_fk foreign key(categoria_udm)
	references categoria_unidad_medida(codigo_udm)
);
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('ml', 'mililitros', 'V');
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('l', 'litros', 'V');
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('u', 'unidad', 'U');
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('d', 'docena', 'U');
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('g', 'gramos', 'P');
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('kg', 'kilogramos', 'P');
INSERT INTO unidad_medida (codigo_udm,descripcion,categoria_udm) VALUES ('lb', 'libras', 'P');

select * from unidad_medida;


--- Tabla productos
create table productos(
	codigo_producto serial not null,
	nombre varchar(50) not null,
	udm char(2) not null,
	precio_venta money not null,
	tiene_iva boolean not null,
	coste money not null,
	categoria int not null,
	stock int not null,
	constraint productos_PK PRIMARY KEY (codigo_producto),
	constraint unidad_medida_FK foreign KEY (udm) 
	references unidad_medida (codigo_udm),
	constraint categoria_FK foreign KEY (categoria) 
	references categorias (codigo_cat)	
);
INSERT INTO productos (nombre,udm,precio_venta,tiene_iva,coste,categoria,stock) VALUES ('Coca cola pequela', 'u', 0.5804,'true',0.3729,7,105);
INSERT INTO productos (nombre,udm,precio_venta,tiene_iva,coste,categoria,stock) VALUES ('Salsa de tomate', 'kg', 0.95,'true',0.8736,3,0);
INSERT INTO productos (nombre,udm,precio_venta,tiene_iva,coste,categoria,stock) VALUES ('Mostaza', 'kg', 0.95,'true',0.89,3,0);
INSERT INTO productos (nombre,udm,precio_venta,tiene_iva,coste,categoria,stock) VALUES ('Fuze tea', 'u', 0.8,'true',0.7,7,49);

select * from productos;

---- Tabla Tipo de documento
create table tipo_documento(
	codigo_doc char(1) not null,
	descripcion varchar(50) not null,
	constraint tipo_documento_PK PRIMARY KEY(codigo_doc)
);
INSERT INTO tipo_documento (codigo_doc,descripcion) VALUES ('C', 'CEDULA');
INSERT INTO tipo_documento (codigo_doc,descripcion) VALUES ('R', 'RUC');

select * from tipo_documento;

----Tabla de proveedores
create table proveedores(
	identificador varchar(13) not null,
	tipo_documento char(1) not null,
	nombre varchar(100) not null,
	telefono varchar(10) not null,
	correo varchar(100) not null,
	direccion varchar(100) not null,
	constraint proveedor_PK PRIMARY KEY(identificador),
	constraint tipo_documento_FK foreign KEY (tipo_documento) 
	references tipo_documento (codigo_doc)	
);
INSERT INTO proveedores (identificador,tipo_documento,nombre,telefono,correo,direccion) 
VALUES ('1105834079', 'C','Juan Yanangomez','0992111606','juanyasa_04@hotmail.com','Amable Maria');
INSERT INTO proveedores (identificador,tipo_documento,nombre,telefono,correo,direccion) 
VALUES ('1102664370', 'R','Clinica','0986311957','clinica@gmail.com','18 de noviembre');

select * from proveedores;


--Tabla Estado Pedido
create table estado_pedido(
	codigo char(1) not null,
	descripcion varchar(50) not null,
	constraint estado_pedido_PK PRIMARY KEY(codigo)
);
INSERT INTO estado_pedido (codigo,descripcion) VALUES ('R', 'Recibido');
INSERT INTO estado_pedido (codigo,descripcion) VALUES ('S', 'Solicitado');

select * from estado_pedido;


---Tabla Cabecera Pedidos
create table cabecera_pedidos(
	numero_pedido serial not null,
	proveedor varchar(13) not null,
	fecha timestamp not null,
	estado char(1) not null,
	constraint cabecera_pedidos_PK PRIMARY KEY(numero_pedido),
	constraint proveedor_FK foreign KEY (proveedor) 
	references proveedores(identificador),	
	constraint estado_FK foreign KEY (estado) 
	references estado_pedido (codigo)
);
INSERT INTO cabecera_pedidos (proveedor,fecha,estado) VALUES ('1105834079','25/04/2023 19:00:00','R');
INSERT INTO cabecera_pedidos (proveedor,fecha,estado) VALUES ('1105834079','25/04/2024 19:01:00','R');

select * from cabecera_pedidos;


---Tabla Detalle pedido
create table detalle_pedido(
	codigo serial not null,
	cabecera_pedido int not null,
	producto int not null,
	cantidad int not null,
	subtotal money not null,
	cantidad_recibida int not null,
	constraint detalle_pedido_PK PRIMARY KEY(codigo),
	constraint cabecera_pedido_FK foreign KEY (cabecera_pedido) 
	references cabecera_pedidos (numero_pedido),	
	constraint producto_FK foreign KEY (producto) 
	references productos (codigo_producto)
);
INSERT INTO detalle_pedido (cabecera_pedido,producto,cantidad,subtotal,cantidad_recibida) 
VALUES (1,1,100,37.29,100);
INSERT INTO detalle_pedido (cabecera_pedido,producto,cantidad,subtotal,cantidad_recibida)
VALUES (1,4,50,11.8,50);
INSERT INTO detalle_pedido (cabecera_pedido,producto,cantidad,subtotal,cantidad_recibida)
VALUES (2,1,10,3.73,10);

select * from detalle_pedido;

---Tabla Historial
create table historial(
	codigo serial not null,
	fecha timestamp not null,
	referencia varchar(25)  not null,
	producto int not null,
	cantidad int not null,
	constraint historial_PK PRIMARY KEY(codigo),	
	constraint producto_FK foreign KEY (producto) 
	references productos (codigo_producto)
);
INSERT INTO historial (fecha,referencia,producto,cantidad) VALUES ('25/4/2024  16:59:00','Pedido 1',1,100);
INSERT INTO historial (fecha,referencia,producto,cantidad) VALUES ('25/4/2024  16:59:01','Pedido 1',4,50);
INSERT INTO historial (fecha,referencia,producto,cantidad) VALUES ('25/4/2024  20:00:00','Pedido 2',1,10);
INSERT INTO historial (fecha,referencia,producto,cantidad) VALUES ('25/4/2024  20:00:00','Venta 1',1,-5);
INSERT INTO historial (fecha,referencia,producto,cantidad) VALUES ('25/4/2024  20:00:00','Venta 1',4,-1);

select * from historial;


---Tabla cabecera ventas
create table cabecera_ventas (
	codigo serial not null,
	fecha_venta timestamp not null,
	total_sin_iva money not null,
	iva money not null,
	total money not null,
	constraint cabecera_ventas_PK PRIMARY KEY(codigo)
);
INSERT INTO cabecera_ventas (fecha_venta,total_sin_iva,iva,total) VALUES ('25/4/2024 16:59:00',3.26,0.39,3.65);

select * from cabecera_ventas;


---Tabla Detalle ventas
create table detalle_ventas (
	codigo serial not null,
	cabecera_venta int not null,
	producto int not null,
	cantidad  int not null,
	precio_venta money not null,
	subtotal money not null,
	subtotal_iva  money not null,
	constraint detalle_ventas_PK PRIMARY KEY(codigo),
	constraint cabecera_ventas_FK foreign KEY (cabecera_venta) 
	references cabecera_ventas (codigo),	
	constraint producto_FK foreign KEY (producto) 
	references productos (codigo_producto)
);
INSERT INTO detalle_ventas (cabecera_venta,producto,cantidad,precio_venta,subtotal,subtotal_iva) VALUES (1,1,5,0.58,2.9,3.25);
INSERT INTO detalle_ventas (cabecera_venta,producto,cantidad,precio_venta,subtotal,subtotal_iva) VALUES (1,4,1,0.36,0.36,0.4);

select * from detalle_ventas;

