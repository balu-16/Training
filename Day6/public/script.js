let editingId = null;
let allBooks = [];

async function checkStatus() {
    const statusBox = document.getElementById('statusBox');
    try {
        const res = await fetch('/api/status');
        const data = await res.json();
        statusBox.textContent = `Server: ${data.status} | Database: ${data.mongodb}`;
        statusBox.className = 'status-box ' + (data.mongodb === 'connected' ? 'connected' : (data.mongodb === 'in-memory' ? 'in-memory' : 'error'));
    } catch {
        statusBox.textContent = 'Server is not reachable';
        statusBox.className = 'status-box error';
    }
}

async function loadBooks() {
    try {
        const res = await fetch('/api/books');
        allBooks = await res.json();
        renderBooks(allBooks);
    } catch (err) {
        console.error('Failed to load books:', err);
    }
}

function renderBooks(books) {
    const tbody = document.getElementById('bookTable');
    const noRecords = document.getElementById('noRecords');

    if (books.length === 0) {
        tbody.innerHTML = '';
        noRecords.style.display = 'block';
        return;
    }

    noRecords.style.display = 'none';
    tbody.innerHTML = books.map(book => `
        <tr>
            <td>${escapeHtml(book.title || '')}</td>
            <td>${escapeHtml(book.author || '')}</td>
            <td>${escapeHtml(book.isbn || '-')}</td>
            <td>${book.pages || '-'}</td>
            <td>${escapeHtml(book.genre || '-')}</td>
            <td>${book.publishedYear || '-'}</td>
            <td>
                <button onclick="editBook('${book._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteBook('${book._id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = allBooks.filter(b =>
        (b.title && b.title.toLowerCase().includes(query)) ||
        (b.author && b.author.toLowerCase().includes(query)) ||
        (b.isbn && b.isbn.toLowerCase().includes(query)) ||
        (b.genre && b.genre.toLowerCase().includes(query))
    );
    renderBooks(filtered);
}

async function submitBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();

    if (!title || !author) {
        alert('Title and Author are required');
        return;
    }

    const bookData = {
        title,
        author,
        isbn: document.getElementById('bookIsbn').value.trim(),
        pages: document.getElementById('bookPages').value ? Number(document.getElementById('bookPages').value) : undefined,
        genre: document.getElementById('bookGenre').value.trim(),
        publishedYear: document.getElementById('bookYear').value ? Number(document.getElementById('bookYear').value) : undefined
    };

    try {
        let res;
        if (editingId) {
            res = await fetch(`/api/books/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
        } else {
            res = await fetch('/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
        }

        if (!res.ok) {
            const err = await res.json();
            alert(err.error || 'Something went wrong');
            return;
        }

        clearForm();
        loadBooks();
    } catch (err) {
        alert('Failed to save book: ' + err.message);
    }
}

function editBook(id) {
    const book = allBooks.find(b => b._id === id);
    if (!book) return;

    document.getElementById('bookTitle').value = book.title || '';
    document.getElementById('bookAuthor').value = book.author || '';
    document.getElementById('bookIsbn').value = book.isbn || '';
    document.getElementById('bookPages').value = book.pages || '';
    document.getElementById('bookGenre').value = book.genre || '';
    document.getElementById('bookYear').value = book.publishedYear || '';

    editingId = id;
    document.getElementById('submitBtn').textContent = 'Update Book';
}

async function deleteBook(id) {
    if (!confirm('Delete this book?')) return;

    try {
        const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            alert(err.error || 'Delete failed');
            return;
        }
        if (editingId === id) clearForm();
        loadBooks();
    } catch (err) {
        alert('Failed to delete: ' + err.message);
    }
}

function clearForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookIsbn').value = '';
    document.getElementById('bookPages').value = '';
    document.getElementById('bookGenre').value = '';
    document.getElementById('bookYear').value = '';
    editingId = null;
    document.getElementById('submitBtn').textContent = 'Add Book';
}

checkStatus();
loadBooks();
