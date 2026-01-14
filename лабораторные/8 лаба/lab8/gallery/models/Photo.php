<?php
/**
 * Модель фотографии
 */
class Photo {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * Создание новой фотографии
     */
    public function create($userId, $title, $description, $filename, $thumbnail) {
        $sql = "INSERT INTO photos (user_id, title, description, filename, thumbnail) 
                VALUES (:user_id, :title, :description, :filename, :thumbnail)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':user_id' => $userId,
            ':title' => $title,
            ':description' => $description,
            ':filename' => $filename,
            ':thumbnail' => $thumbnail
        ]);
        return $this->db->lastInsertId();
    }
    
    /**
     * Получение всех фотографий, отсортированных по популярности
     */
    public function getAllByPopularity() {
        $sql = "SELECT p.*, u.username, u.email 
                FROM photos p 
                JOIN users u ON p.user_id = u.id 
                ORDER BY p.views DESC, p.created_at DESC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }
    
    /**
     * Получение фотографии по ID
     */
    public function getById($id) {
        $sql = "SELECT p.*, u.username, u.email 
                FROM photos p 
                JOIN users u ON p.user_id = u.id 
                WHERE p.id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }
    
    /**
     * Увеличение счетчика просмотров
     */
    public function incrementViews($id) {
        $sql = "UPDATE photos SET views = views + 1 WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([':id' => $id]);
    }
    
    /**
     * Получение фотографий пользователя
     */
    public function getByUserId($userId) {
        $sql = "SELECT * FROM photos WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':user_id' => $userId]);
        return $stmt->fetchAll();
    }
}
