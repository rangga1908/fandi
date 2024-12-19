const tombol = document.querySelector(".tombol");
const menu = document.querySelector(".menu");
tombol.addEventListener("click", () => {
  menu.classList.toggle("aktif");
});

const form = document.getElementById('paymentForm');
const tableBody = document.getElementById('tableBody');
let dataArray = [];
let editIndex = -1;

const hargaSampah = {
    "Sisa Makanan": 2000,
    "Daun Kering": 1500,
    "Sisa Sayuran": 2500,
    "Kulit Buah": 2000,
    "Ranting & Kayu": 1000
};

function addDataToTable(data, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.nama}</td>
        <td>${data.alamat}</td>
        <td>${data.jenisSampah}</td>
        <td>${data.berat} kg</td>
        <td>Rp ${data.totalHarga.toLocaleString('id-ID')}</td>
        <td>${data.tanggal}</td>
        <td>${data.noTelp}</td>
        <td>
            <button class="btn-edit" onclick="editData(${index})">Edit</button>
            <button class="btn-delete" onclick="deleteData(${index})">Hapus</button>
            <button class="btn-print" onclick="printStruk(${index})">Cetak Struk</button>
        </td>
    `;
    return row;
}

function printStruk(index) {
    const data = dataArray[index];
    localStorage.setItem('truskData', JSON.stringify(data));
    window.open('struk.html', '_blank');
}


function refreshTable() {
    tableBody.innerHTML = '';
    dataArray.forEach((data, index) => {
        tableBody.appendChild(addDataToTable(data, index));
    });
}

    function editData(index) {
        const data = dataArray[index];
        document.getElementById('nama').value = data.nama;
        document.getElementById('alamat').value = data.alamat;
        document.getElementById('jenisSampah').value = data.jenisSampah;
        document.getElementById('berat').value = data.berat;
        document.getElementById('tanggal').value = data.tanggal;
        document.getElementById('noTelp').value = data.noTelp;
        editIndex = index;
        document.querySelector('.btn-submit').textContent = 'Update Data';
    }

    function deleteData(index) {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            dataArray.splice(index, 1);
            refreshTable();
        }
    }

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        nama: document.getElementById('nama').value,
        alamat: document.getElementById('alamat').value,
        jenisSampah: document.getElementById('jenisSampah').value,
        berat: parseFloat(document.getElementById('berat').value),
        tanggal: document.getElementById('tanggal').value,
        noTelp: document.getElementById('noTelp').value
    };

    const hargaPerKg = hargaSampah[formData.jenisSampah] || 0;
    formData.totalHarga = formData.berat * hargaPerKg;

    if (editIndex === -1) {
        dataArray.push(formData);
    } else {
        dataArray[editIndex] = formData;
        editIndex = -1;
        document.querySelector('.btn-submit').textContent = 'Simpan Data';
    }

    refreshTable();
    form.reset();
});


