const toposCategoria = [
	{ id_categoria: 1, genero: 'Femenil' },
	{ id_categoria: 2, genero: 'Varonil' },
	{ id_categoria: 3, genero: 'Mixto' }
];

const toposModalidad = [
	{ id_modalidad: 1, tipo: 'Fútbol 5' },
	{ id_modalidad: 2, tipo: 'Fútbol 7' },
	{ id_modalidad: 3, tipo: 'Fútbol 11' }
];

function getIdCategoriaByGenero(genero) {
	const categoria = toposCategoria.find(cat => cat.genero === genero);
	if (categoria) {
		return categoria.id_categoria;
	} else {
		return null; // or throw an error if appropriate
	}
}

function getIdModalidadByTipo(tipo) {
	const modalidad = toposModalidad.find(mod => mod.tipo === tipo);
	if (modalidad) {
		return modalidad.id_modalidad;
	} else {
		return null; // or throw an error if appropriate
	}
}

module.exports = {getIdCategoriaByGenero, getIdModalidadByTipo}